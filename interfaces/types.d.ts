
export type AssertionResult<T>  =  AssertionSuccess<T> | AssertionFailure
export interface AssertionSuccess<T> {
    success: boolean
    data: T
  }
  
  export interface AssertionFailure {
    success: boolean
    error: string
  }
  
  export interface CollectionConfigRow {
    contractAddress: string
    name: string
    openseaSlug: string
  }


  export type ModelWithTimestamps<T> = T & {
    createdAt: Date
    updatedAt: Date
  }
  
  
  export interface IPagination {
    limit?: number
    offset?: number
  }
  
  export interface MongoRecord {
    _id?: string
  }

  
  

export interface SeaportProtocolData {
    //was opensearesponse
    //nftPrice: string;
    parameters: SeaportProtocolParameters
    signature: string
  }
  
  export interface SeaportProtocolParameters {
    //was opensearesponseparameters
    //nftPrice: string;
    consideration: Consideration[]
    parameterOrderType: number
    offerer: string
    zone: string
    offer: Consideration[]
    startTime: string
    endTime: string
    orderType: number
    zoneHash: string
    salt: string
    totalOriginalConsiderationItems?: string
    conduitKey: string
  }
  
  export interface Consideration {
    token: string
    identifierOrCriteria: string
    startAmount: string
    endAmount: string
    itemType: number
    recipient?: string
  }
  



export interface SeaportOrder {
    created_date: string
    closing_date: string
    listing_time: number
    expiration_time: number
    order_hash: string
    protocol_data: SeaportProtocolData
    protocol_address: string
    maker: any
    taker: any
    current_price: string
    maker_fees: any[]
    taker_fees: any[]
    side: string
    order_type: string
    cancelled: boolean
    finalized: boolean
    marked_invalid: boolean
    client_signature: string
    relay_id: string
    criteria_proof: string
    maker_asset_bundle: any
    taker_asset_bundle: any
  }
  
  export interface SeaportApiResponse {
    next?: string
    previous?: string
    orders: SeaportOrder[]
  }
  

export interface SubmitBidArgs {
    borrower?: string
    totalPurchasePrice: string
    downPayment: string
    lender?: string
    principal: string
    duration: string
    interestRate: string
    metadataURI: string
    signatureExpiration: string
  
    referralAddress: string
  }
  
  export interface DomainData {
    name: string
    version: string
    chainId: number
    verifyingContract: string
  }
  
  export interface BasicOrderParams {
    considerationToken: string
    considerationIdentifier: BigNumber
    considerationAmount: BigNumber
    offerer: string
    zone: string
    offerToken: string
    offerIdentifier: BigNumber
    offerAmount: string
    basicOrderType: number
    startTime: BigNumber
    endTime: BigNumber
    zoneHash: string
    salt: string
    offererConduitKey: string
    fulfillerConduitKey: string
    totalOriginalAdditionalRecipients: BigNumber
    additionalRecipients: AdditionalRecipient[]
    signature: string
  }
  
  export interface AdditionalRecipient {
    amount: BigNumber
    recipient: string
  }