import mongoose from "mongoose";

const connectDB = async (db) => {
  try {
    await mongoose.connect(db);
    console.log("Data base connected.....");
  } catch (err) {
    console.log(err);

    //exiting the process
    process.exit(1);
  }
};

export default connectDB;
