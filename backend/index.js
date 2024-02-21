import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import homeRouter from "./src/routes/home.js";
import loginRouter from "./src/routes/login.js";
import { APIrouter } from "./src/routes/routes.js";

///////////////////////////////////////////////// app set-up //////////////////////////////////////////////////
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

/* Define route handler for the root URL ("/")
app.get("/", (req, res) => {
  res.send("Welcome to my API"); // You can customize this message
});*/

app
 .use(APIrouter)
 //  .use("/routes/home", homeRouter)
 app.use("/", homeRouter); // Mount the homeRouter
 app.use("/login", loginRouter); // Mount the loginRouter at the /login path
app.set("view engine", "ejs");

///////////////////////////////////////////////// cors set-up //////////////////////////////////////////////////
var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:5173", // Allow CORS from any origin
    "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS", // Allow all HTTP methods
    "Access-Control-Allow-Headers": "*", // Allow specified headers
  },
};

//////////////////////////////////////////////////  mongoDB ///////////////////////////////////////////////////
const mongoURLString = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURLString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

// Connect to the database before listening
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// const database = mongoose.connection;

// database.on("error", (error) => {
//   console.log(error);
// });
