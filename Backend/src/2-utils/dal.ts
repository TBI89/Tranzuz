import mongoose from "mongoose";
import appConfig from "./app-config";

async function connect(): Promise<void> {
    try {
        const db = await mongoose.connect(appConfig.mongodbConnectionString);
        console.log("we are connected to mongoDB, db: " + db.connections[0].name);
    } catch (error: any) {
        console.log(error);
    }

}

export default {
    connect
};