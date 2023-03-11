import mongoose, { Model } from 'mongoose'
import { AssertionResult } from '../interfaces/types'

const { ObjectId } = require('mongodb')

export function mongoIdToString(mongoId: any): string {
  if (typeof mongoId == 'string') {
    return mongoId
  }

  return mongoId.valueOf()
}

export function stringToMongoId(str: string): any {
  let result

  try {
    result = ObjectId(str)
  } catch (err) {
    console.error('input: ', str, err)
  }

  return result
}

export async function findRecordById(
  id: string,
  model: Model<any>
): Promise<AssertionResult<any>> {
  const item = await model.findById(stringToMongoId(id))

  if (!item) {
    return { success: false, error: `Could not find ${model.modelName}` }
  }

  return { success: true, data: item }
}

export async function findRecord(
  query: any,
  model: Model<any>
): Promise<AssertionResult<any>> {
  const items = await model.findOne(query)

  if (!items) {
    return {
      success: false,
      error: `Could not find record for ${model.modelName}`,
    }
  }

  return { success: true, data: items }
}

export async function findRecords(
  query: any,
  model: Model<any>
): Promise<AssertionResult<any>> {
  let items = await model.find(query)

  if (!items) {
    return {
      success: false,
      error: `Could not find records for ${model.modelName}`,
    }
  }

  items = items.filter((x) => typeof x != 'undefined')

  return { success: true, data: items }
}

/*
export async function findRecordsWithPagination(
  query: any,
  model: Model<any>,
  pagination: IPagination = { limit: 1000, offset: 0 }
): Promise<AssertionResult<any>> {
  if (!pagination.limit) pagination.limit = 1000
  if (!pagination.offset) pagination.offset = 0

  let items = await model
    .find(query)
    .skip(pagination.offset)
    .limit(pagination.limit)

  if (!items) {
    return {
      success: false,
      error: `Could not find records for ${model.modelName}`,
    }
  }

  items = items.filter((x) => typeof x != 'undefined')

  return { success: true, data: items }
}*/

export async function findCount(
  query: any,
  model: Model<any>
): Promise<AssertionResult<number>> {
  const count: number = await model.count(query)

  if (!count || isNaN(count)) {
    return {
      success: false,
      error: `Could not find count for ${model.modelName}`,
    }
  }

  return { success: true, data: count }
}

export async function createRecord(
  input: any,
  model: Model<any>
): Promise<AssertionResult<any>> {
  const result = await model
    .create(Object.assign(input, { _id: new mongoose.Types.ObjectId() }))
    .then((insert) => {
      return { success: true, data: insert }
    })
    .catch((error) => {
      console.error(error)
      return {
        success: false,
        error: `createRecord: Could not create ${model.modelName}`,
      }
    })

  return result
}

export async function modifyRecord(
  id: string,
  update: any,
  model: Model<any>
): Promise<AssertionResult<any>> {
  const options = { returnOriginal: false }

  const updatedRecord = await model.findOneAndUpdate(
    { _id: stringToMongoId(id) },
    update,
    options
  )

  if (!updatedRecord) {
    return { success: false, error: `Could not modify ${model.modelName}` }
  }

  return { success: true, data: updatedRecord }
}

export async function deleteRecord(
  id: string,
  model: Model<any>
): Promise<AssertionResult<any>> {
  const updatedRecord = await model.findOneAndDelete({
    _id: stringToMongoId(id),
  })

  if (!updatedRecord) {
    return { success: false, error: `Could not modify ${model.modelName}` }
  }

  return { success: true, data: updatedRecord }
}

export async function deleteRecords(
  query: any,
  model: Model<any>
): Promise<AssertionResult<any>> {
  const updatedRecord = await model.deleteMany(query)

  if (!updatedRecord) {
    return { success: false, error: `Could not modify ${model.modelName}` }
  }

  return { success: true, data: updatedRecord }
}
