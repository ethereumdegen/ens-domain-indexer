import mongoose, { Schema, Model, InferSchemaType, model, Require_id } from 'mongoose'
 


import {getDatabaseName} from '../../lib/app-helper'

export const LegacyReverseRecordSetSchema = new Schema(
  {
   
    //namehash
    node: { type:String, required:true, index:true }, //this is 'node' in events
    
    txHash:  { type:String, required:true, index:true },

    from: { type: String  },

    blockNumber: { type: String, required: true, index:true },

  
    lastUpdated: Number
  } 
)
  

const database = mongoose.connection.useDb(getDatabaseName());


mongoose.pluralize(null);

export type ILegacyReverseRecordSet = Require_id<
  InferSchemaType<typeof LegacyReverseRecordSetSchema>
> 
export const LegacyReverseRecordSet = database.model<ILegacyReverseRecordSet, Model<ILegacyReverseRecordSet>>('legacy_reverse_record_set', LegacyReverseRecordSetSchema)
