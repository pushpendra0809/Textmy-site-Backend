import mongoose from "mongoose";

const ConnectedDb = async (DATABASE_URL) => {
    try {
        const DB_Option = {
            dbName: "mxtertask",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(DATABASE_URL, DB_Option);
        console.log("Database Successfully Connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

export default ConnectedDb;
