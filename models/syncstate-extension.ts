import { Schema, Model, InferSchemaType, model, Require_id } from 'mongoose'

import { ModelWithTimestamps } from '../interfaces/types'

export const SyncStateSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: String },
  },
  {
    pluginTags: ['withTimestamps'],
  }
)

// used for full text search
SyncStateSchema.index({ key: 'text' })

export type ISyncStateWithoutTimestamp = Require_id<
  InferSchemaType<typeof SyncStateSchema>
>
export type ISyncState = Require_id<
  ModelWithTimestamps<ISyncStateWithoutTimestamp>
>

export const SyncState = model<ISyncState, Model<ISyncState>>(
  'SyncState',
  SyncStateSchema
)
