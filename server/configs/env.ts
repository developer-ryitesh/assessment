import dotenv from "dotenv";
dotenv.config();
const ENV = {
   MONGODB_URI: String(process.env.MONGODB_URI),
   PORT: Number(process.env.PORT),
   //DB
   JWT_SECRET_KEY: String(process.env.JWT_SECRET_KEY),
   ACCESS_TOKEN_EXPIRES_IN: String(process.env.ACCESS_TOKEN_EXPIRES_IN),
   REFRESH_TOKEN_EXPIRES_IN: String(process.env.REFRESH_TOKEN_EXPIRES_IN),
};

export default ENV;
