import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
//pass : whatsappweb
const Connection = async () => {
    const URL = `mongodb://${userName}:${password}@whatsappwebclonedb-shard-00-00.sjtfu.mongodb.net:27017,whatsappwebclonedb-shard-00-01.sjtfu.mongodb.net:27017,whatsappwebclonedb-shard-00-02.sjtfu.mongodb.net:27017/?ssl=true&replicaSet=atlas-eklci3-shard-0&authSource=admin&retryWrites=true&w=majority&appName=WhatsAppWebCloneDB`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error Bro ", error.message);
    }
}

export default Connection;
