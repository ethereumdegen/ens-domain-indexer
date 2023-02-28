import mongoose, { Schema, Model, InferSchemaType, model, Require_id } from 'mongoose'
 


import {getDatabaseName} from '../../lib/app-helper'

export const EnsDomainSchema = new Schema(
  {
    contractAddress: { type: String, required: true, index: true },

    tokenId: { type: String, required: true, index: true, unique:true  },
    label: { type: String, required: true, index: true }, //this is 'label' in events

    name: { type: String, required: true, index: true, unique:true  },

    //namehash
    node: { type:String, required:true, index:true }, //this is 'node' in events
    
    resolverAddress: { type: String },


    registrant: {type:String},
    controller: {type: String},

    registrantUpdatedAtBlock: Number,
    controllerUpdatedAtBlock: Number, 
    //label 
    //node 


  
    lastUpdated: Number
  } 
)
 
//ContractStateSchema.index({ contractAddress: 1, tokenId: 1 }, { unique: true })


const database = mongoose.connection.useDb(getDatabaseName());


mongoose.pluralize(null);

export type IEnsDomain = Require_id<
  InferSchemaType<typeof EnsDomainSchema>
> 
export const EnsDomain = database.model<IEnsDomain, Model<IEnsDomain>>('ens_domain', EnsDomainSchema)
