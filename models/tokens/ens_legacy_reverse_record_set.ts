import mongoose, { Schema, Model, InferSchemaType, model, Require_id } from 'mongoose'
 


import {getDatabaseName} from '../../lib/app-helper'

export const EnsLegacyReverseRecordSetSchema = new Schema(
  {
   
    //namehash
    node: { type:String, required:true, index:true }, //this is 'node' in events
    
    txHash: { type:String, required: true  }, 

    address: { type: String  },

    blockNumber: { type: String, required: true, index:true },

  
    lastUpdated: Number 
  } 
)
  

const database = mongoose.connection.useDb(getDatabaseName());


mongoose.pluralize(null);

export type IEnsLegacyReverseRecordSet = Require_id<
  InferSchemaType<typeof EnsLegacyReverseRecordSetSchema>
> 
export const EnsLegacyReverseRecordSet = database.model<IEnsLegacyReverseRecordSet, Model<IEnsLegacyReverseRecordSet>>('legacy_reverse_record_set', EnsLegacyReverseRecordSetSchema)
