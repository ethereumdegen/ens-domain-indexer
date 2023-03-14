 
import { LoggerInstance, Service, ServiceBroker, Utils } from 'moleculer'
 
 
import { SyncState } from '../models/syncstate-extension' 

import { Cursor, Model, PipelineStage } from 'mongoose'
import { mongoIdToString } from '../lib/mongo-helper'
import { AssertionResult } from '../interfaces/types'
 
 import {ethers} from 'ethers'

import { isAssertionSuccess } from '../lib/assertion-helper'
import { IEnsNewOwnerEvent } from '../models/tokens/ens_new_owner_event'
import { ILegacyReverseRecordSet } from '../models/tokens/legacy_reverse_record_set'
import { getTransactionByHash } from '../modules/full-node-mod'

const Cron = require('moleculer-cron')

/*

Loop through the vibegraph data from the beginning up to head.. sorted by blockNumber and using a cursor.. 

*/

 
let cursorId: string | undefined = undefined
const PAGE_SIZE = 50 

export default class PopulateFromForLegacyReverseRecordTransactionsService extends Service {
  public constructor(public broker: ServiceBroker) {
    super(broker)
 
    this.parseServiceSchema({
      name: 'populatefromforlegacyreverserecordtransactions',
      dependencies: [ 'legacy_reverse_record_set'],
      mixins: [Cron],
      crons: [
        {
          name: 'populate-from-for-legacy-reverse-record-transactions',
          cronTime: '*/2 * * * * *', // every 2 seconds

          onTick: async () => {
 
            

            const cursorStateKey = 'populate-from-for-legacy-reverse-record-transactions.cursor'

            //find one or create 
            let cursorState = await SyncState.findOne({ key: cursorStateKey })

            if (!cursorState) {
              cursorState = await SyncState.create({
                key: cursorStateKey,
              })
            }
            // ---

            if (!cursorId) {
              cursorId = cursorState.value
            }

            this.logger.info(
              `Finding legacy reverse record transactions with cursor ${cursorId}`
            )
 
 
           const recordQuery:any  = cursorId ? { _id: { $gt: cursorId } , from:{$exists:false} } : {from:{$exists:false}} 
           
           const legacyRecordsFiltered:any[] = await this.broker.call('legacy_reverse_record_set.find',{
            query:recordQuery,
            sortBy: { '_id': 1 },
            limit: PAGE_SIZE
           }) 

       
           for(let record of legacyRecordsFiltered){

            console.log('meep 1', record )
            //find the FROM field 
            const from:any = await this.fetchTransactionFromField( record.txHash )
            console.log('meep 2', from )
            if(from){
              const updated:any = await this.broker.call('legacy_reverse_record_set.updateOne',
                { query:{ txHash:  record.txHash } , set:{ from:from }  }
              )



             console.log('meep 3', updated )

            } 


           // let created = await this.addReverseRecordFromEvent(record,{broker:this.broker});
           }
 
 
            //increment the cursor 
            const lastImportRecord:any = legacyRecordsFiltered[legacyRecordsFiltered.length - 1]


            if (lastImportRecord) {
              cursorId = mongoIdToString(lastImportRecord._id)
              this.logger.info('advancing cursor: ', cursorId)

              await cursorState.updateOne({ value: cursorId })
            } else {
              //reset
              await cursorState.updateOne({ $unset: { value: 1 } })
              cursorId = undefined
            }

            if(legacyRecordsFiltered.length == 0){
              //reset back to the start
              await cursorState.updateOne({ $unset: { value: 1 } })
              cursorId = undefined
            }
           
        

          },
          timezone: 'America/Nipigon',
        },
      ],
    })
  }



  async fetchTransactionFromField( txHash:string  ){

    try{

      let txData:any = await getTransactionByHash(txHash)

      console.log('result',txData.data.result)
      return txData.data.result.from
  
    }catch(error:any){
      console.error(error)
      return undefined 
    }
   

  }
}


  