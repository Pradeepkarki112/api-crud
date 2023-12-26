import mongoose from "mongoose"

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("MongoDB Connected Successfully")
  } catch (error) {
    console.log(error)
  }
}

export default connectMongoDB;
