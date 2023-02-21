 
 
import Vibegraph, { VibegraphConfig } from 'vibegraph'
 
require('dotenv').config()

let IndexerENSRegistry = require( '../indexers/IndexerENSRegistry' )
let IndexerENSRegistrarController = require( '../indexers/IndexerENSRegistrarController' )
let IndexerENSResolver = require( '../indexers/IndexerENSResolver' )
 

let EnsRegistrarControllerABI = require( '../abi/ENSRegistrarController.json' )
let EnsRegistryABI = require( '../abi/ENSRegistry.json' )
let EnsPublicResolverABI = require( '../abi/ENSPublicResolver.json' )
 
const networkName = 'goerli'

const web3Provider = process.env.GOERLI_PROVIDER_URL!

const contractsConfig = require('../config/contracts-config.json')

const localConfig = contractsConfig[networkName]

 async function runVibeGraph(){
            
            
        let indexerENSRegistry = new IndexerENSRegistry()
        let indexerENSRegistrarController = new IndexerENSRegistrarController(  )
        let indexerENSResolver = new IndexerENSResolver()

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
      }];

        
        let vibegraphConfig:VibegraphConfig = {
            contracts: localConfig.contracts,
             
            dbName:"vibegraph_development",
            indexRate: 1*1000,
            courseBlockGap: 8000,
            updateBlockNumberRate: 60*1000,
            fineBlockGap: 20,
            logLevel:'debug',
            subscribe: true, 
            customIndexers,
            web3ProviderUri: web3Provider
        }

        let vibegraph = new Vibegraph()
        await vibegraph.init( vibegraphConfig )
        vibegraph.startIndexing(  )  

        

    } 


    runVibeGraph()
  
    