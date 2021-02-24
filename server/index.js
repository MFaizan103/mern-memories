import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const app = express();

// Routes
import postRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// Routes //

// Middleware
app.use(bodyParser.json({ limit: "30 mb", extented: true }));
app.use(bodyParser.urlencoded({ limit: "30 mb", extented: true }));
app.use(cors());
app.options("*", cors());
app.use(morgan("tiny"));
// Middleware //

// Middleware for Routes
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
// Middleware for Routes//

// Greeting Route
app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});
// Greeting Route//

// Environment Variables
const dbURL = process.env.DB;
const port = process.env.PORT || 5000;
// Environment Variables //

// Server and Data Base Function
const startServerAndDataBase = async () => {
  try {
    await mongoose.connect(dbURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB CONNECTED");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    mongoose.set("useFindAndModify", false);
  } catch (error) {
    console.log(error.message);
  }
};
// Server and Data Base Function //

// Starting Server and Connection to Database
startServerAndDataBase();
// Starting Server and Connection to Database //
