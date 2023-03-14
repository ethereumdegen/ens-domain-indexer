
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
  
export function getNetworkNameFromChainId(chainId: number): string {
  if (chainId == 4) return 'rinkeby'
  if (chainId == 5) return 'goerli'
  if (chainId == 137) return 'polygon'

  return 'mainnet'
}


export function getRpcUrl(networkName: string): string | undefined {
  switch (networkName) {
    case 'goerli':
      return process.env.GOERLI_PROVIDER_URL
   
    default:
      return process.env.MAINNET_PROVIDER_URL
  }
}
