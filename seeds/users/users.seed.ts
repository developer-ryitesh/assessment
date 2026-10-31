import bcrypt from "bcrypt";
import UserModel from "../../server/models/user.model";

export default async function UsersSeed() {
   const password = await bcrypt.hash("Root@123", 10);
   const avatar = "https://www.w3schools.com/howto/img_avatar.png";

   await UserModel.insertMany([
      {
         email: "ryitesh94@gmail.com",
         password,
         role: "ADMIN",
         avatar,
      },
      {
         email: "developer.ryitesh@gmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "aman@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "rahul@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "sachin@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "vikas@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "arjun@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "rohit@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "deepak@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "manish@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "nitesh@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "praveen@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "sunil@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "anil@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "kiran@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "pankaj@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "lokesh@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "suresh@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "mohit@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
      {
         email: "ravi@youpmail.com",
         password,
         role: "USER",
         avatar,
      },
   ]);
}
