import mongoose, { Schema, Model, InferSchemaType, model, Require_id } from 'mongoose'
 


import {getDatabaseName} from '../../lib/app-helper'

export const LegacyReverseRecordTransactionSchema = new Schema(
  {
   
    //namehash
    node: { type:String, required:true, index:true }, //this is 'node' in events
    
    txHash:  { type:String, required:true, index:true },

    from: { type: String, required: true },

    blockNumber: { type: String, required: true, index:true },

  
    lastUpdated: Number
  } 
)
  

const database = mongoose.connection.useDb(getDatabaseName());


mongoose.pluralize(null);

export type ILegacyReverseRecordTransaction = Require_id<
  InferSchemaType<typeof LegacyReverseRecordTransactionSchema>
> 
export const LegacyReverseRecordTransaction = database.model<ILegacyReverseRecordTransaction, Model<ILegacyReverseRecordTransaction>>('legacy_reverse_record_transaction', LegacyReverseRecordTransactionSchema)
