

Legacy Reverse Resolve service

1. Loop through all of the 'EnsNewOwnerEvent' s  where the 'owner' was set to the legacy reverse registrar -  0x084b1c3C81545d370f3634392De611CaaBFf8148

2. for each of these, make note of the transaction hash.   Ask teh JSON rpc node for the transaction data and figure out the 'from' field.  Use that along with the NODE from the EnsNewOwnerEvent event to build a reverse  record 

