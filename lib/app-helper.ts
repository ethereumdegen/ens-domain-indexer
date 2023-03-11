
require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
type VALID_ENVIRONMENT_NAMES = 'development' | 'staging' | 'production' | 'test'

const MONGO_CONNECT_URI = process.env.MONGO_URI


export function getAppName() : string {
    return "vibegraph"
}


export function getEnvironmentName(): VALID_ENVIRONMENT_NAMES {
    const envName = NODE_ENV ? NODE_ENV : 'development'
  
    if (
      envName != 'development' &&
      envName != 'staging' &&
      envName != 'production' &&
      envName != 'test'
    )
      throw new Error(`Invalid environment ${envName} `)
    return envName
  }
  


export function getDatabaseName() : string {

    return getAppName().concat('_').concat(getEnvironmentName())
  }



  export function getDatabaseConnectURI(): string {
    if (!MONGO_CONNECT_URI) throw new Error('Missing ENV variable: MONGO_URI')
  
    return MONGO_CONNECT_URI
  }
  