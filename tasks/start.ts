 
 
import Vibegraph, { VibegraphConfig } from 'vibegraph'
 
require('dotenv').config()

let IndexerENSRegistry = require( '../indexers/IndexerENSRegistry' )
let IndexerENSRegistrarController = require( '../indexers/IndexerENSRegistrarController' )
let IndexerENSResolver = require( '../indexers/IndexerENSResolver' )
let IndexerENSReverseRegistrar = require( '../indexers/IndexerENSReverseRegistrar' )
let IndexerENSReverseRegistrarLegacy = require( '../indexers/IndexerENSReverseRegistrarLegacy' )
 

let EnsRegistrarControllerABI = require( '../abi/ENSRegistrarController.json' )
let EnsRegistryABI = require( '../abi/ENSRegistry.json' )
let EnsPublicResolverABI = require( '../abi/ENSPublicResolver.json' )
let EnsReverseResolverABI = require( '../abi/ENSReverseRegistrar.json' )
let EnsReverseResolverLegacyABI = require( '../abi/ENSReverseRegistrarLegacy.json' )
 
const networkName = 'mainnet'

const web3Provider = process.env.MAINNET_PROVIDER_URL!

const contractsConfig = require('../config/contracts-config.json')

const localConfig = contractsConfig[networkName]


/*

Runs the vibegraph indexer to populate the database with all the events from the config

*/

 async function runVibeGraph(){
            
            
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
  
    