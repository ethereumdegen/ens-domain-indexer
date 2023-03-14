
import axios from 'axios'


import * as dotenv from 'dotenv' 
dotenv.config()

const FULL_NODE_URI = process.env.FULL_NODE_API_MAINNET!;


export async function getTransactionByHash(txhash:string){

  

    const response = await axios( {
        method: 'POST',
        url: FULL_NODE_URI,
        data:  ({
            jsonrpc: '2.0',
            method: 'eth_getTransactionByHash',
            params: [txhash],
            id: 0,
          }),
      });
 
    return response 
}
 