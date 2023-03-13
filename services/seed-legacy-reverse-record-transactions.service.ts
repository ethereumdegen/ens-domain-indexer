 
import { LoggerInstance, Service, ServiceBroker, Utils } from 'moleculer'
 
 
import { SyncState } from '../models/syncstate-extension' 

import { Cursor, Model, PipelineStage } from 'mongoose'
import { mongoIdToString } from '../lib/mongo-helper'
import { AssertionResult } from '../interfaces/types'
 
 import {ethers} from 'ethers'

import { isAssertionSuccess } from '../lib/assertion-helper'
import { IEnsLegacyReverseRecordSet } from '../models/tokens/ens_legacy_reverse_record_set'
import { env } from 'process'

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

           const recordQuery:any  = cursorId ? { _id: { $gt: cursorId }, address: legacyReverseRegistrar.address   } : {  address: legacyReverseRegistrar.address } 
           
           const newOwnerEvents:any[] = await this.broker.call('new_owner_vibegraph.find',{
            query:recordQuery,
            sortBy: { '_id': 1 },
            limit: PAGE_SIZE
           }) 

          console.log({newOwnerEvents})

        /*    this.logger.info(
              `Reverse records imported ${importedReverseRecords}`
            ) */

        
               
           for(let evt of newOwnerEvents){

            await this.addReverseRecordSetFromEvent( evt, {broker:this.broker} )

         
          }


           


            //increment the cursor 
            const lastImportRecord:any = newOwnerEvents[newOwnerEvents.length - 1]


            if (lastImportRecord) {
              cursorId = mongoIdToString(lastImportRecord._id)
              this.logger.info('advancing cursor: ', cursorId)

              await cursorState.updateOne({ value: cursorId })
            } else {
              //reset
              await cursorState.updateOne({ $unset: { value: 1 } })
              cursorId = undefined
            }

            if(newOwnerEvents.length == 0){
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


  /*
  this works ! but tx hash is null. make sure that is brought in

  then build a NEW service that looops thru these and hits quiknode to find FROM and update it on 

  */

  async addReverseRecordSetFromEvent(evt: any, config: {broker: ServiceBroker} ){
    

    let legacyReverseRecordSet:Omit<IEnsLegacyReverseRecordSet,'_id'>= {
      node: evt.node,
      txHash: evt.txHash,
      //address: evt.from,  

      blockNumber: evt.blockNumber,
      lastUpdated: Date.now() 

    }

    //update the record if it has a lesser blockNumber, otherwise try to insert (will fail if node exists) 
    const upserted = await config.broker.call('legacy_reverse_record_set.upsertOne',
    {query:{
     // node:evt.node,
      txHash: evt.txHash,
     // blockNumber: {$lt: evt.blockNumber }
    } ,
    set: legacyReverseRecordSet
  }) 
 


   // console.log({upserted})

  }
}


  