import { ServiceBroker } from 'moleculer'

import { LegacyReverseRecordSet } from '../../../models/tokens/legacy_reverse_record_set'

import PrimaryAdapter from './adapter-primary'

export default class LegacyReverseRecordSetModelService extends PrimaryAdapter {
  public constructor(broker: ServiceBroker) {
    super(broker, LegacyReverseRecordSet,"legacy_reverse_record_set")
  }
}

