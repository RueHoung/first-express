import logger from "./logger.js";
import { env } from "./env.js"
import mongoose from "mongoose";
import type { ConnectOptions } from "mongoose";

const uri = `mongodb+srv://${env.mongoAccount}:${env.mongoPassword}@cluster0.qly2zt4.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const clientOptions: ConnectOptions = { dbName: env.mongoDatabase, serverApi: { version: '1', strict: true, deprecationErrors: true } };
export async function connectMongo() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        logger.info(`MongoDB connected database: ${mongoose.connection.name}`);
        logger.info("MongoDB connected");
    } catch (err) {
        logger.fatal(err, "MongoDB connection failed")
        throw err
    }
}