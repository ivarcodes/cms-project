import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/testapi');
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // If connection fails, stop the process
    }
};

export default connectDb;
