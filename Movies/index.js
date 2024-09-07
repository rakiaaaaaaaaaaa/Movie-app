import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";
import app from "./server.js";

dotenv.config();

const url = `mongodb+srv://bb:aaabbbccc@cluster0.pvskmmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

async function main() {
    let client;
    try {
        client = await MongoClient.connect(url, {
            maxPoolSize: 50,
            wtimeoutMS: 2500,
        });
        console.log("Successfully connected to MongoDB");

        await ReviewsDAO.injectDB(client);

        // Start the server after a successful connection
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error("MongoDB connection error:", err.stack);
        process.exit(1);
    }
}

main();
