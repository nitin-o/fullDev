import mongoose from "mongoose";
import { DATABASE_NAME, DATABASE_URL, DATABASE_URL1 } from "../constants.js";

const DataBase_Connection = async () => {
    try {
        console.log(`🔹 Connecting to: ${DATABASE_URL}/${DATABASE_NAME}`);

        const connection = await mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`);
        console.log(`✅ MongoDB Connected: ${connection.connection.host}`);

    } catch (error) {
        console.error("❌ MongoDB Atlas Connection Failed:", error.message);

        // Retry with local MongoDB
        console.log("🔄 Retrying with local MongoDB...");
        try {
            console.log(`🔹 Connecting to: ${DATABASE_URL1}/${DATABASE_NAME}`);

            const connection = await mongoose.connect(`${DATABASE_URL1}/${DATABASE_NAME}`);
            console.log(`✅ MongoDB Connected: ${connection.connection.host}`);

        } catch (error) {
            console.error("❌ Local MongoDB Connection Failed:", error.message);
            console.error("❌ Both database connections failed! Exiting...");
            process.exit(1);
        }
    }
};

export default DataBase_Connection;
