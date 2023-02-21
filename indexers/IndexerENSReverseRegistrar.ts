
 
 import { ethers, BigNumber } from 'ethers'
import { EnsAddrChangedEvent } from '../models/tokens/ens_addr_changed_event'
import { EnsDomain, IEnsDomain } from '../models/tokens/ens_domain'
import { SetEnsResolverEvent } from '../models/tokens/set_ens_resolver_event'

import { ContractEvent } from 'vibegraph'
import VibegraphIndexer from 'vibegraph/dist/indexers/VibegraphIndexer'
import { EnsReverseClaimedEvent } from '../models/tokens/ens_reverse_claimed_event'
 

 
module.exports =  class IndexerENSReverseRegistrar extends VibegraphIndexer {
   
    async onEventEmitted(event:ContractEvent){

        let eventArgs:any = event.args 
        let blockNumber = event.blockNumber


        if(event.name=='ReverseClaimed'){  

             console.log('got emitted event ', event )

            const address = eventArgs[0]
            const node = eventArgs[1] //the namehash of the ens domain 
            

            let created = await EnsReverseClaimedEvent.create({
                node,
                address,
                blockNumber
            })


        }

     
    }

 
}