import { Service, ServiceBroker } from 'moleculer'
 
 import DbAdapterBase from '../adapter-base'
import { Model as MongooseModel } from 'mongoose'
 
 
 

export default abstract class DbAdapterVibegraph extends DbAdapterBase {
  protected constructor(broker: ServiceBroker, Model: typeof MongooseModel, customServiceName?:string) {
    super(broker, Model, customServiceName)

    
  }


  //override !!
  public getAdapter():any{
    return this.getVibegraphAdapter()
  }
 
}
