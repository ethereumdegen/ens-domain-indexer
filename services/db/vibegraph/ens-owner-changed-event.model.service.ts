import { ServiceBroker } from 'moleculer'

 
import { EnsNewOwnerEvent } from '../../../models/tokens/ens_new_owner_event'  

import VibegraphAdapter from './adapter-vibegraph'

export default class EnsNewOwnerEventModelService extends VibegraphAdapter {
  public constructor(broker: ServiceBroker) {
    super(broker, EnsNewOwnerEvent,"new_owner_vibegraph")
  }
}

