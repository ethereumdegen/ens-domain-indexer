import mongoose, { Schema, Model, InferSchemaType, model, Require_id } from 'mongoose'
 



import {getDatabaseName} from '../../lib/app-helper'


export const EnsAddrChangedEventSchema = new Schema(
  {
   
    //namehash
    node: { type:String, required:true, index:true }, //this is 'node' in events
    
    address: { type: String, required: true },

    blockNumber: { type: String, required: true, index:true },
 
  
    lastUpdated: Number
  } 
)
  

const database = mongoose.connection.useDb(getDatabaseName());


mongoose.pluralize(null);

export type IEnsAddrChangedEvent = Require_id<
  InferSchemaType<typeof EnsAddrChangedEventSchema>
> 
export const EnsAddrChangedEvent = database.model<IEnsAddrChangedEvent, Model<IEnsAddrChangedEvent>>('ens_addr_changed_event', EnsAddrChangedEventSchema)
