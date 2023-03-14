
 
 import { ethers, BigNumber } from 'ethers'
 
import { ContractEvent } from 'vibegraph'
import VibegraphIndexer from 'vibegraph/dist/indexers/VibegraphIndexer'
 

 //https://etherscan.io/tx/0x30ec2532b7efd51a8ddebdaa6ffa5023cda805f65ab3e9be1acde5421473993b#eventlog

module.exports =  class IndexerENSReverseRegistrarLegacy extends VibegraphIndexer {
   
    async onEventEmitted(event:ContractEvent){

        let eventArgs:any = event.args 
        let blockNumber = event.blockNumber


       /*
        see this 

        https://etherscan.io/tx/0x0e69e9034fa25ca5173ed36ea8d8ecd384dd08f742b2c3c5fca26ac50d1591ed#eventlog



       */


     
    }

 
}