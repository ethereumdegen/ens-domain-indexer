 
import { ethers, BigNumber } from 'ethers'

 
var namehash = require('@ensdomains/eth-ens-namehash')


 async function resolveReverse(){
         
        //for must.eth 
        let address = '0x171563d880dAe4E7B11e462943073d69e7ED77B3'

        let reverseNamespace = `${address.slice(2)}.addr.reverse`

        /*const labelHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name)) //this is 'label'
        const tokenId = BigNumber.from(labelHash).toString()  //this is 'id'

        console.log({labelHash})
        console.log({tokenId})*/


        //what is the node ?  its the namehash
        //this is correct !!! 
        const nameHash = namehash.hash(`${reverseNamespace}`)
        console.log({nameHash})


        //so to find the reverse record for 0x810, I have to find the event that incorporates this namehash(node)


        /*
        If you feed the nameHash into 
        https://etherscan.io/address/0xA2C122BE93b0074270ebeE7f6b7292C7deB45047#readContract name()
        then it does out put the ENS domain ! 

        
        */
    } 


    resolveReverse()
  
    