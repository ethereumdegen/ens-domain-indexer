import { LoggerInstance, Service, ServiceBroker } from 'moleculer'

import  {
    getDatabaseConnectURI,
    getEnvironmentName,
    getNetworkNameFromChainId,
  
} from '../lib/app-helper'



import Vibegraph, { VibegraphConfig } from 'vibegraph'

 

 

let IndexerENSRegistry = require( './vibegraph/indexers/IndexerENSRegistry' )
let IndexerENSRegistrarController = require( './vibegraph/indexers/IndexerENSRegistrarController' )
let IndexerENSResolver = require( './vibegraph/indexers/IndexerENSResolver' )
let IndexerENSReverseRegistrar = require( './vibegraph/indexers/IndexerENSReverseRegistrar' )
let IndexerENSReverseRegistrarLegacy =require( './vibegraph/indexers/IndexerENSReverseRegistrarLegacy' )

let EnsRegistrarControllerABI = require( './vibegraph/abi/ENSRegistrarController.json' )
let EnsRegistryABI = require( './vibegraph/abi/ENSRegistry.json' )
let EnsPublicResolverABI = require( './vibegraph/abi/ENSPublicResolver.json' )
let EnsReverseResolverABI = require( './vibegraph/abi/ENSReverseRegistrar.json' )
 
let EnsReverseResolverLegacyABI = require( './vibegraph/abi/ENSReverseRegistrarLegacy.json' )

const Cron = require('moleculer-cron') 




let indexerENSRegistry = new IndexerENSRegistry()
let indexerENSRegistrarController = new IndexerENSRegistrarController(  )
let indexerENSResolver = new IndexerENSResolver() //not used
let indexerENSReverseRegistrar = new IndexerENSReverseRegistrar()
let indexerENSReverseRegistrarLegacy = new IndexerENSReverseRegistrarLegacy()

const customIndexers = [{
 type:'EnsRegistry', 
 abi: EnsRegistryABI ,  
 handler: indexerENSRegistry
},
{
 type:'EnsRegistrarController', 
 abi: EnsRegistrarControllerABI ,  
 handler: indexerENSRegistrarController
},
{
 type:'EnsPublicResolver', 
 abi: EnsPublicResolverABI ,  
 handler: indexerENSResolver
},
{
 type:'EnsReverseRegistrar', 
 abi: EnsReverseResolverABI ,  
 handler: indexerENSReverseRegistrar


}, 
{
  type:'EnsReverseRegistrarLegacy', 
  abi: EnsReverseResolverLegacyABI ,  
  handler: indexerENSReverseRegistrarLegacy


}


];
 

const NODE_ENVIRONMENT =  getEnvironmentName()

const MONGO_URI = getDatabaseConnectURI()

 

const chainId: number = 1  

const web3Provider = process.env.MAINNET_PROVIDER_URL!

const contractsConfig = require('./vibegraph/contracts-config.json')

    


export default class VibegraphService extends Service {
  public constructor(public broker: ServiceBroker) {
    super(broker)

    const vibegraphPromise = Promise.resolve(getVibegraphConfig()).then(
      (config) => buildVibegraph(broker, this.logger, config)
    )

    this.parseServiceSchema({
      name: 'vibegraph',
      mixins: [Cron],
      started: async (): Promise<void> => {},
      crons: [
        {
          name: 'Update Vibegraph',
          cronTime: '*/2 * * * * *', // every 2 seconds

          onTick: async () => {
            const vibegraph = await vibegraphPromise

            try {
              await updateVibegraph(broker, this.logger, vibegraph)
            } catch (e) {
              this.logger.error(e)
            }
          },
          runOnInit: async () => {
            this.logger.info('Vibegraph Cron created')
          },
          timezone: 'America/Nipigon',
        },
      ],
    })
  }
}

export async function getVibegraphConfig(): Promise<any> {
 

  const VIBE_DB_NAME = 'vibegraph'

 


  if (!chainId) throw new Error('Vibegraph: Undefined chainId')
  const networkName = getNetworkNameFromChainId(chainId)


  const localConfig = contractsConfig[networkName]
 


  let vibegraphConfig:VibegraphConfig = {
    contracts: localConfig.contracts,
     
    dbName: `${VIBE_DB_NAME}_${NODE_ENVIRONMENT}`,
    indexRate: 1*1000,
    courseBlockGap: 8000,
    updateBlockNumberRate: 60*1000,
    fineBlockGap: 20,
    logLevel:'debug',
    subscribe: false, 
    customIndexers,
    web3ProviderUri: web3Provider
}

  return vibegraphConfig
}

export async function buildVibegraph(
  broker: ServiceBroker,
  logger: LoggerInstance,
  vibegraphConfig: any
): Promise<any> {
  logger.info(`Vibegraph is building.`)

  const vibegraph = new Vibegraph()
  await vibegraph.init(vibegraphConfig)

  return vibegraph
}

export async function updateVibegraph(
  broker: ServiceBroker,
  logger: LoggerInstance,
  vibegraph: any
): Promise<void> {
  // put this in  loop

  logger.info(`Vibegraph is indexing.`)

  await vibegraph.indexData() // fetch the event logs from rpc

  await vibegraph.updateLedger(100) // execute callbacks on indexers from the events
}
