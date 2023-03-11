import { Service, ServiceBroker } from 'moleculer'
 
 import DbAdapterBase from '../adapter-base'
import { Model as MongooseModel } from 'mongoose'
 
 
 

export default abstract class DbAdapterPrimary extends DbAdapterBase {
  protected constructor(broker: ServiceBroker, Model: typeof MongooseModel, customServiceName?:string) {
    super(broker, Model,customServiceName)
 
    
  }
 

  public getAdapter():any{
    return this.getPrimaryAdapter()
  }

}
