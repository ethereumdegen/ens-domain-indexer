import mongoose, { Schema, Model, InferSchemaType, model, Require_id } from 'mongoose'
 
import {getDatabaseName} from '../../lib/app-helper'


export const EnsNameChangedEventSchema = new Schema(
  {
   
    //namehash
    node: { type:String, required:true, index:true }, //this is 'node' in events
    
    name: { type: String, required: true },

    blockNumber: { type: String, required: true, index:true },
 
    lastUpdated: Number
  } 
)
  

const database = mongoose.connection.useDb(getDatabaseName());

mongoose.pluralize(null);

export type IEnsNameChangedEvent = Require_id<
  InferSchemaType<typeof EnsNameChangedEventSchema>
> 
export const EnsNameChangedEvent = database.model<IEnsNameChangedEvent, Model<IEnsNameChangedEvent>>('ens_name_changed_event', EnsNameChangedEventSchema)
