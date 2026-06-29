import { MongoClient, ServerApiVersion } from "mongodb";
import logger from "./logger.js";
import { env } from "./env.js"

const uri = `mongodb+srv://${env.mongoAccount}:${env.mongoPassword}@cluster0.qly2zt4.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export async function connectMongo() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        logger.info("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        logger.fatal(err, "MongoDB connection failed")
        throw err
    }
    
}

export { client } ;