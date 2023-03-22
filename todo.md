

 

resolve ens in reverse using api ..  use it for 0xjpegs 

1.  find events where new_owner was set on the ENS Registry where the address is  legacyReverseRegistrar 
0x084b1c3C81545d370f3634392De611CaaBFf8148


ex. 
https://etherscan.io/tx/0x81f56e84c48725783290d75b28ccf1bd406702844346fe429756348b21a73a1c#eventlog




2. write a test that specifically tests the block when i did legacy reverse-register shit 

3. run this code on the cloud server and see if it works or not 


4. move these services to the monorepo?  or just a lookup table...




5.  ERROR ensapi_1/LEGACY_REVERSE_RECORD_SET: E11000 duplicate key error collection: vibegraph_development.legacy_reverse_record_set index: node_1 dup key: { node: "0xa097f6721ce401e757d1223a763fef49b8b5f90bb18567ddb86fd205dff71d34" }

i wonder if this is an issue..