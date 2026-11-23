import {MongoClient, ServerApiVersion} from 'mongodb';

const uri = 'mongodb://eva3_express:wZcjnXtlr8tccPud@ac-t8szkto-shard-00-00.j7nwjo4.mongodb.net:27017,ac-t8szkto-shard-00-01.j7nwjo4.mongodb.net:27017,ac-t8szkto-shard-00-02.j7nwjo4.mongodb.net:27017/?ssl=true&replicaSet=atlas-14g9vf-shard-0&authSource=admin'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export default client;