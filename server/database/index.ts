import mongoose from "mongoose";
import ENV from "../configs/env";

export default async function connect2DB() {
   try {
      await mongoose.connect(ENV.MONGODB_URI);
      console.log(`Database successfully connected 👍`);
   } catch (error) {
      console.log("datasbase error : ", error);
      process.exit(1);
   }
}
