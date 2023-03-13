import { ServiceBroker } from 'moleculer'

import { EnsLegacyReverseRecordSet } from '../../../models/tokens/ens_legacy_reverse_record_set'

import PrimaryAdapter from './adapter-primary'

export default class LegacyReverseRecordSetModelService extends PrimaryAdapter {
  public constructor(broker: ServiceBroker) {
    super(broker, EnsLegacyReverseRecordSet,"legacy_reverse_record_set")
  }
}

