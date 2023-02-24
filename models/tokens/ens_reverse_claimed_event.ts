import mongoose, { Schema, Model, InferSchemaType, model, Require_id } from 'mongoose'
 


import {getDatabaseName} from '../../lib/app-helper'

export const EnsReverseClaimedEventSchema = new Schema(
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

export type IEnsReverseClaimedEvent = Require_id<
  InferSchemaType<typeof EnsReverseClaimedEventSchema>
> 
export const EnsReverseClaimedEvent = database.model<IEnsReverseClaimedEvent, Model<IEnsReverseClaimedEvent>>('ens_reverse_claimed_event', EnsReverseClaimedEventSchema)
