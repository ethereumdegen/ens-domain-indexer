# ens-domain-indexer
Lets index some ENS domains with [vibegraph](https://github.com/ethereumdegen/vibegraph) :) 


### Env File 

You must populate a new file named '.env' with the parameters listed in '.env.template'.  For example with an Alchemy API or Infura API json rpc connection url. 



### How to run the indexer 

  yarn install
  
  yarn start 
  
  
  
### Folder structure 

ABI - Contains contract ABIs for helping decode raw event logs 

Config - Contains the config file for vibegraph which includes contract addresses (for indexing) 

Indexers - Containers the indexer files which are scripts that process emitted events in order to store them into mongoDB as custom records 

Models - Contains the MongoDB model files 

Tasks - Contains scripts for starting the utility 


### Example stored ens domain records in MongoDB (after indexing) 

![image](https://user-images.githubusercontent.com/6249263/223533303-6b396dbe-32a2-4a02-a577-748fba319a00.png)
