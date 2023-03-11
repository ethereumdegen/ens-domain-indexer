import { ServiceBroker } from 'moleculer'

import { LegacyReverseRecordTransaction } from '../../../models/tokens/legacy_reverse_record_transaction'

import PrimaryAdapter from './adapter-primary'

export default class LegacyReverseRecordTransactionModelService extends PrimaryAdapter {
  public constructor(broker: ServiceBroker) {
    super(broker, LegacyReverseRecordTransaction,"legacy_reverse_record_tx")
  }
}

