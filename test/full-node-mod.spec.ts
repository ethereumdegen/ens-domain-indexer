import axios from 'axios'
import chai, { expect } from 'chai'
 
import {getTransactionByHash} from "../modules/full-node-mod"
 
 
describe('Full Node Module', () => {
 
   

    before(async () => { 
  
    })

    after(async () => {
     
    }) 


    it('should fetch transaction data', async () => {
 
      let fetched = await getTransactionByHash('0x783183d8be60f0fede7caf30f4b803f586e31fc2bba098e2e2bd89f9dad801f5')

      console.log({fetched})

      expect(fetched.status).to.eql(200) 
      expect(fetched.data).to.exist
    
    })
 
})
