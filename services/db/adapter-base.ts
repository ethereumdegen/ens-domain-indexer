import { Service, ServiceBroker } from 'moleculer'
import DbService from 'moleculer-db'
import MongooseDbAdapter from 'moleculer-db-adapter-mongoose'
 
import { Model as MongooseModel } from 'mongoose'

import {getDatabaseConnectURI,getAppName,getEnvironmentName} from '../../lib/app-helper';
 

const APP_NAME = getAppName()

const ENV_MODE = getEnvironmentName() 

const DATABASE_CONNECT_URI = getDatabaseConnectURI()

 

const PRIMARY_DB_NAME = APP_NAME.concat('_').concat(ENV_MODE) 

const VIBEGRAPH_DB_NAME = 'vibegraph'.concat('_').concat(ENV_MODE)



interface ServiceBrokerArgs {
  params: any,

}
export default abstract class DbAdapterBase extends Service {
  protected constructor(broker: ServiceBroker, Model: typeof MongooseModel, customServiceName?: string ) {
    super(broker)

    const serviceName = customServiceName ? customServiceName: Model.modelName.toLowerCase()

    this.parseServiceSchema({
      name: serviceName,
      actions: {

        async insertOne(args: ServiceBrokerArgs) {
          let insertedCount = 0
          let inserted

          let element = args.params

          console.log({element})
          try {
            inserted = await Model.insertMany([element])
            insertedCount = inserted.length
          } catch (error:any) {
          //  if (error instanceof MongoBulkWriteError) {
              insertedCount = error.insertedCount
              //if (error.code === 11000) {
                // Duplicate key
                this.logger.error(error.errmsg)
             // }
         //   }
          }
          if (insertedCount > 0) {
            this.logger.info(
              `Added ${insertedCount} ${serviceName} to the database.`
            )

          
          }
          return inserted
        },


        async insertMany(args: ServiceBrokerArgs) {
          let insertedCount = 0
          let inserted

          const params = args.params 
          
          try {
            //ordered false means each will be individually tried
            inserted = await Model.insertMany( params, {ordered:false} )
            insertedCount = inserted.length
          } catch (error:any) {
          //  if (error instanceof MongoBulkWriteError) {
              insertedCount = error.insertedCount
              if (error.code === 11000) {
                // Duplicate key
                 //    this.logger.error(error.errmsg)
              }
         //   }
          }
          if (insertedCount > 0) {
            this.logger.info(
              `Added ${insertedCount} ${serviceName} to the database.`
            )

          
          }
          return inserted
        },
 

        async updateOne(args: ServiceBrokerArgs) {
          let updated;

          //must be like this bc of how args work !!
          const query = args.params.query 
          const set = args.params.set

          
          try {
            
            updated = await Model.updateOne(
              query,{$set:set})
            
          } catch (error:any) {           
                this.logger.error(error)            
          }
        /*  if (updated) {
            this.logger.info(
              `Updated record for ${serviceName} .`
            )
          }*/
        
          
        },


        async upsertOne(args: ServiceBrokerArgs) {
          let updated;

           //must be like this bc of how args works!!
           const query = args.params.query 
           const set = args.params.set
 
        

          try {
            
            updated = await Model.findOneAndUpdate(query,{$set:set}, {upsert:true})
            
          } catch (error:any) {           
             //   this.logger.error(error)            
          }
         /* if (updated) {
            this.logger.info(
              `Updated record for ${serviceName} .`
            )
          }*/
          return updated
        
          
        },

        //does this work ?
        async count(args: ServiceBrokerArgs) {
          let result;

        
          try {
            
            result = await Model.count( args.params )
            
            
          } catch (error:any) {           
                this.logger.error(error)            
          }
        
            this.logger.info(
              `Count for ${serviceName} .`
            )
            return result 
           
        },

        async find(args: ServiceBrokerArgs) {

       //   console.log('calling find w args', {args})
          let result; 
         
          try {
            
            result = await Model.find( args.params.query )
            .sort( args.params.sortBy ? args.params.sortBy : {} )
            .limit(args.params.limit ? args.params.limit : 1000)
            
            
          } catch (error:any) {           
                this.logger.error(error)            
          }
        
            this.logger.info(
              `Count for ${serviceName} .`
            )
            return result 
           
        },

      },
      mixins: [DbService],
      adapter: this.getAdapter(),
      model: Model,
    })
  }

  public getAdapter():any{
    return undefined
  }

  public getPrimaryAdapter(): any {
    if (ENV_MODE === 'test') {
      // New DB memory adapter for testing
      return new DbService.MemoryAdapter()
    }   else {
      if (!process.env.MONGO_URI) throw new Error('No Mongo URI specified')
      // Mongo adapter
      const adapterURI = `${DATABASE_CONNECT_URI}/${PRIMARY_DB_NAME}`

      return new MongooseDbAdapter(adapterURI)
    }
  }


  public getVibegraphAdapter(): any {
    if (ENV_MODE === 'test') {
      // New DB memory adapter for testing
      return new DbService.MemoryAdapter()
    }  else {
      if (!process.env.MONGO_URI) throw new Error('No Mongo URI specified')
      // Mongo adapter
      const adapterURI = `${DATABASE_CONNECT_URI}/${VIBEGRAPH_DB_NAME}`
      
      return new MongooseDbAdapter(adapterURI)
    }
  }
}
