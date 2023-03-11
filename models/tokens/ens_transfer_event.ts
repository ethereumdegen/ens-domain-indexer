import mongoose, { Schema, Model, InferSchemaType, model, Require_id } from 'mongoose'
 



import {getDatabaseName} from '../../lib/app-helper'

export const EnsTransferEventSchema = new Schema(
  {
   
    //namehash
    node: { type:String, required:true, index:true }, //this is 'node' in events
    
    address: { type: String, required: true },

    blockNumber: { type: String, required: true, index:true },
 
  
    lastUpdated: Number
  } 
)
 
//ContractStateSchema.index({ contractAddress: 1, tokenId: 1 }, { unique: true })


const database = mongoose.connection.useDb(getDatabaseName());


mongoose.pluralize(null);

export type IEnsTransferEvent = Require_id<
  InferSchemaType<typeof EnsTransferEventSchema>
> 
export const EnsTransferEvent = database.model<IEnsTransferEvent, Model<IEnsTransferEvent>>('ens_transfer_event', EnsTransferEventSchema)
