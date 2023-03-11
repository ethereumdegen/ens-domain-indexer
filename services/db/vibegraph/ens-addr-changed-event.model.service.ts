import { ServiceBroker } from 'moleculer'

 
import { EnsAddrChangedEvent } from '../../../models/tokens/ens_addr_changed_event'  

import VibegraphAdapter from './adapter-vibegraph'

export default class EnsAddrChangedEventModelService extends VibegraphAdapter {
  public constructor(broker: ServiceBroker) {
    super(broker, EnsAddrChangedEvent,"addr_changed_vibegraph")
  }
}

