 
import { ethers, BigNumber } from 'ethers'

 
var namehash = require('@ensdomains/eth-ens-namehash')


/*

HOW TO RESOLVE REVERSE 


1. append '.addr.reverse' to the address  and namehash that -> thats the node of the reverse association
2. in the database, look for the 'NameChanged' event that was emitted by the public resolver that has that node 
3. the name on the record is the answer! 

(on goerli, address 0x171563d880dAe4E7B11e462943073d69e7ED77B3 resolves to must.eth)

*/

 async function resolveReverse(){
         
        //for must.eth 
        let address = '0x171563d880dAe4E7B11e462943073d69e7ED77B3'

        let reverseNamespace = `${address.slice(2)}.addr.reverse`

      


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
  
    