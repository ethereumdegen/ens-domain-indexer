
//const VibegraphIndexer = require('./VibegraphIndexer')
 import { ethers, BigNumber } from 'ethers'
import { EnsAddrChangedEvent } from '../models/tokens/ens_addr_changed_event'
import { EnsDomain, IEnsDomain } from '../models/tokens/ens_domain'
import { SetEnsResolverEvent } from '../models/tokens/set_ens_resolver_event'

import { ContractEvent } from 'vibegraph'
import VibegraphIndexer from 'vibegraph/dist/indexers/VibegraphIndexer'
import { EnsNameChangedEvent } from '../models/tokens/ens_name_changed_event'
 

 //PublicResolver 
module.exports =  class IndexerENSResolver extends VibegraphIndexer {
   
    async onEventEmitted(event:ContractEvent){


 
        let eventArgs:any = event.args 
        let blockNumber = event.blockNumber


        if(event.name=='AddrChanged'){  

           //  console.log('got emitted event ', event )

            const node = eventArgs[0]
            const address = eventArgs[1]


            //all resolvers MUST TRIGGER THIS EVENT !! this is the key - the secret sauce 
            //event AddrChanged(bytes32 indexed node, address a);
            

            //this is for forward resolution - sets 'controller'

            let created = await EnsAddrChangedEvent.create({
                node,
                address,
                blockNumber
            })


        }

        if(event.name=='NameChanged'){
         // console.log('got emitted event ', event )

              /* '0xb5a483dd1a1f1166124a6b382431c5463e446f754e5088a7496150cbe0443147',
                'tbtest.eth'
              */


          const node = eventArgs[0] //namehash(0x000.addr.reverse)
          const newName = eventArgs[1]

          let created = await EnsNameChangedEvent.create({
            node,
            name:newName,
            blockNumber
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