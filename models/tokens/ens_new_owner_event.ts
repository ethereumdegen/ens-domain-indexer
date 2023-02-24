import mongoose, { Schema, Model, InferSchemaType, model, Require_id } from 'mongoose'

import {getDatabaseName} from '../../lib/app-helper'

export const EnsNewOwnerEventSchema = new Schema(
  {
   
    //namehash
    node: { type:String, required:true, index:true }, //this is 'node' in events
    
    label: { type: String, required: true },

    address: { type: String, required: true },

    blockNumber: { type: String, required: true, index:true },
 
  
    lastUpdated: Number
  } 
)
  

const database = mongoose.connection.useDb(getDatabaseName());


mongoose.pluralize(null);

export type IEnsNewOwnerEvent = Require_id<
  InferSchemaType<typeof EnsNewOwnerEventSchema>
> 
export const EnsNewOwnerEvent = database.model<IEnsNewOwnerEvent, Model<IEnsNewOwnerEvent>>('ens_new_owner_event', EnsNewOwnerEventSchema)
