 
import { LoggerInstance, Service, ServiceBroker, Utils } from 'moleculer'
 
 
import { SyncState } from '../models/syncstate-extension' 

import { Cursor, Model, PipelineStage } from 'mongoose'
import { mongoIdToString } from '../lib/mongo-helper'
import { AssertionResult } from '../interfaces/types'
 
 import {ethers} from 'ethers'

import { isAssertionSuccess } from '../lib/assertion-helper'
import { IEnsNewOwnerEvent } from '../models/tokens/ens_new_owner_event'
import { ILegacyReverseRecordSet } from '../models/tokens/legacy_reverse_record_set'

const Cron = require('moleculer-cron')

/*

Loop through the vibegraph data from the beginning up to head.. sorted by blockNumber and using a cursor.. 

*/

 
let cursorId: string | undefined = undefined
const PAGE_SIZE = 50 

export default class SeedLegacyReverseRecordTransactionsService extends Service {
  public constructor(public broker: ServiceBroker) {
    super(broker)
 
    this.parseServiceSchema({
      name: 'seedlegacyreverserecordtransactions',
      dependencies: ['new_owner_vibegraph','legacy_reverse_record_set'],
      mixins: [Cron],
      crons: [
        {
          name: 'seed-legacy-reverse-record-transactions',
          cronTime: '*/2 * * * * *', // every 2 seconds

          onTick: async () => {
 
            

            const cursorStateKey = 'seed-legacy-reverse-record-transactions.cursor'

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
 

 
            const legacyReverseRegistrar = {address: "0x084b1c3C81545d370f3634392De611CaaBFf8148"}

           const recordQuery:any  = cursorId ? { _id: { $gt: cursorId } , address: legacyReverseRegistrar.address} : {address: legacyReverseRegistrar.address} 
           
           const newOwnerEventsFiltered:any[] = await this.broker.call('new_owner_vibegraph.find',{
            query:recordQuery,
            sortBy: { '_id': 1 },
            limit: PAGE_SIZE
           }) 

           console.log({newOwnerEventsFiltered})


           for(let event of newOwnerEventsFiltered){

            let created = await this.addReverseRecordFromEvent(event,{broker:this.broker});
           }

        /*    this.logger.info(
              `Reverse records imported ${importedReverseRecords}`
            ) */

         /*
           const setOwnerToLegacyReverseRegistrarEvents = newOwnerEvents.filter( (e:any) => {

             ethers.utils.getAddress(e.address) == legacyReverseRegistrar.address

           } )*/
           
         

           /* const reverseRecords = setOwnerToLegacyReverseRegistrarEvents.map( (d:any) => {

              return {
                name: d.name,
              
              //  address: d.address, 
                node: d.node,
                blockNumber: d.blockNumber, 
                
              }
            } )


            
           for(let reverseRecord of reverseRecords){

             await this.addReverseRecordFromEvent( reverseRecord, {broker:this.broker} )

          
           }
            

            */
            //increment the cursor 
            const lastImportRecord:any = newOwnerEventsFiltered[newOwnerEventsFiltered.length - 1]


            if (lastImportRecord) {
              cursorId = mongoIdToString(lastImportRecord._id)
              this.logger.info('advancing cursor: ', cursorId)

              await cursorState.updateOne({ value: cursorId })
            } else {
              //reset
              await cursorState.updateOne({ $unset: { value: 1 } })
              cursorId = undefined
            }

            if(newOwnerEventsFiltered.length == 0){
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



  async addReverseRecordFromEvent(evt: IEnsNewOwnerEvent, config: {broker: ServiceBroker} ){

    let reverse_record_params:Omit<ILegacyReverseRecordSet,'_id'>= {
      node:evt.node,
      txHash:evt.transactionHash,
     // from: undefined ,
      blockNumber: evt.blockNumber,
      lastUpdated: Date.now()
    }
 

    console.log('inserting ',{reverse_record_params})
    //update the record if it has a lesser blockNumber, otherwise try to insert (will fail if node exists) 
    const insert:any = await config.broker.call('legacy_reverse_record_set.insertOne',
  
      reverse_record_params
     )

    
      console.log('insert',insert)
  
  


   // console.log({upserted})

  }
}


  