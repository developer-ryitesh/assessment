import dotenv from "dotenv";
dotenv.config();
import UsersSeed from "./users/users.seed";
import connect2DB from "../src/database";

export default async function main() {
   connect2DB();
   console.log("⏳ Seeding users...");
   try {
      await UsersSeed();
      console.log("✅ Users seeded successfully");
      process.exit(0);
   } catch (error) {
      console.log(error);

      console.error("❌ Error while seeding");
      process.exit(1);
   }
}

main();
