import mongoose, { Schema, Model, InferSchemaType, model, Require_id } from 'mongoose'
 

export const EnsReverseClaimedEventSchema = new Schema(
  {
   
    //namehash
    node: { type:String, required:true, index:true }, //this is 'node' in events
    
    

    address: { type: String, required: true },

    blockNumber: { type: String, required: true, index:true },

  
    lastUpdated: Number
  } 
)
  
mongoose.pluralize(null);

export type IEnsReverseClaimedEvent = Require_id<
  InferSchemaType<typeof EnsReverseClaimedEventSchema>
> 
export const EnsReverseClaimedEvent = model<IEnsReverseClaimedEvent, Model<IEnsReverseClaimedEvent>>('ens_reverse_claimed_event', EnsReverseClaimedEventSchema)
