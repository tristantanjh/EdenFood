import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import flash from "connect-flash";
import https from "https";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI);

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static("public"))
  .use(
    session({
      secret: process.env.ENCRYPTION_KEY,
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(flash());

export {
  app,
  mongoose,
  passport,
  passportLocalMongoose,
  https
};
