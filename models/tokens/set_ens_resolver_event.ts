import mongoose, { Schema, Model, InferSchemaType, model, Require_id } from 'mongoose'
 



import {getDatabaseName} from '../../lib/app-helper'

export const SetEnsResolverEventSchema = new Schema(
  {
   
    //namehash
    node: { type:String, required:true, index:true }, //this is 'node' in events
    
    resolverAddress: { type: String, required: true },

    blockNumber: { type: String, required: true, index:true },
 
  
    lastUpdated: Number
  } 
)
 
//ContractStateSchema.index({ contractAddress: 1, tokenId: 1 }, { unique: true })


const database = mongoose.connection.useDb(getDatabaseName());


mongoose.pluralize(null);

export type ISetEnsResolverEvent = Require_id<
  InferSchemaType<typeof SetEnsResolverEventSchema>
> 
export const SetEnsResolverEvent = database.model<ISetEnsResolverEvent, Model<ISetEnsResolverEvent>>('set_ens_resolver_event', SetEnsResolverEventSchema)
