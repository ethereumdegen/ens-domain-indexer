import axios from 'axios'
import chai, { expect } from 'chai'
 
import {getTransactionByHash} from "../modules/full-node-mod"
 
 
describe('Full Node Module', () => {
 
   

    before(async () => { 
  
    })

    after(async () => {
     
    }) 


    it('should fetch transaction data', async () => {
        

        const txhash = '0x81f56e84c48725783290d75b28ccf1bd406702844346fe429756348b21a73a1c'

      let fetched = await getTransactionByHash( txhash )

      console.log({fetched})

      expect(fetched.status).to.eql(200) 
      expect(fetched.data).to.exist

      console.log(fetched.data.result)
      
      //grab from address !  pair with NODE of the new owner event 
    
    })
 
})
