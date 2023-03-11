import { ServiceBroker } from 'moleculer'

import { EnsReverseClaimedEvent  } from '../../../models/tokens/ens_reverse_claimed_event'

import PrimaryAdapter from './adapter-primary'

export default class ReverseRecordModelService extends PrimaryAdapter {
  public constructor(broker: ServiceBroker) {
    super(broker, EnsReverseClaimedEvent,"reverse_record_primary")
  }
}

