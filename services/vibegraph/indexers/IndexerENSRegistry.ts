
//const VibegraphIndexer = require('./VibegraphIndexer')
 import { ethers, BigNumber } from 'ethers'
import { EnsDomain, IEnsDomain } from '../../../models/tokens/ens_domain'
import { EnsNewOwnerEvent } from '../../../models/tokens/ens_new_owner_event'
import { SetEnsResolverEvent } from '../../../models/tokens/set_ens_resolver_event'

import { ContractEvent } from 'vibegraph'
import VibegraphIndexer from 'vibegraph/dist/indexers/VibegraphIndexer'
 
module.exports =  class IndexerENSRegistry extends VibegraphIndexer {
   
    async onEventEmitted(event:ContractEvent){


 
        let eventArgs:any = event.args 
        let blockNumber = event.blockNumber
        let transactionHash = event.transactionHash

      //  console.log('got emitted event ', event )

        if(event.name=='NewResolver'){  

           

            const node = eventArgs[0]
            const resolverAddress = eventArgs[1]

            let created = await SetEnsResolverEvent.create({
                node,
                resolverAddress,
                blockNumber,
                transactionHash
            })


        }

        if(event.name=='NewOwner'){  
            
          //  console.log('new owner event', {event} )

         const node = eventArgs[0]
         const label = eventArgs[1]
         const address = eventArgs[2]  //owner

         let created = await EnsNewOwnerEvent.create({
             node,
             label,
             address,
             blockNumber,
             transactionHash
         })


     }

      /*  console.log('got emitted event ', event )
 
        let eventArgs:any = event.args 
        let registeredName = eventArgs[0]

        const labelHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(registeredName))
        const tokenId = BigNumber.from(labelHash).toString()
        

        //this works ! 
        console.log({tokenId})

        const newDomain:Omit<IEnsDomain,'_id'> = {
            contractAddress: event.address,
            tokenId,
            name: registeredName,
            label: labelHash,
            node: namehash.hash(`${registeredName}.eth`),
          //  resolverAddress: undefined  //?
        }
        let created = await EnsDomain.create(newDomain)
        */
    }

 
}