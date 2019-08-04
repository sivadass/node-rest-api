const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
// config env variables
dotenv.config();

// connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to Mongo Atlas DB")
);

// Middle ware
app.use(cors());
app.use(express.json());

// route middlewares
app.use("/api/user", authRoute);
app.use("/api/post", postRoute);
app.get("/", (req, res) => {
  res.send("🌍 Node Rest API server is up and running 🚀 🚀 🚀");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("🔥🔥🔥 Node Rest API server is on 🔥🔥🔥")
);
