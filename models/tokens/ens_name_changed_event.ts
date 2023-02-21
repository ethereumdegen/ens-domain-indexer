import mongoose, { Schema, Model, InferSchemaType, model, Require_id } from 'mongoose'
 

export const EnsNameChangedEventSchema = new Schema(
  {
   
    //namehash
    node: { type:String, required:true, index:true }, //this is 'node' in events
    
    name: { type: String, required: true },

    blockNumber: { type: String, required: true, index:true },
 
    lastUpdated: Number
  } 
)
  
mongoose.pluralize(null);

export type IEnsNameChangedEvent = Require_id<
  InferSchemaType<typeof EnsNameChangedEventSchema>
> 
export const EnsNameChangedEvent = model<IEnsNameChangedEvent, Model<IEnsNameChangedEvent>>('ens_name_changed_event', EnsNameChangedEventSchema)
