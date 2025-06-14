import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);

        mongoose.connection.on("connected", () =>
            console.log("✅ MongoDB is connected")
        );
        mongoose.connection.on("error", (err) =>
            console.error("❌ MongoDB connection error:", err)
        );
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err);
        process.exit(1); // Exit the process if connection fails
    }
};

export default connectDB;
