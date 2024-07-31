const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./API/routes/user.route.js");
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/users", userRoute);

//hello message
app.get("/", (req, res) => {
  res.send("Hello form Node API");
});

mongoose
  .connect(
    "mongodb+srv://ganeshkrin90:i4224AtQ2GOkIVOV@app-api-cluster.uo1gsge.mongodb.net/?retryWrites=true&w=majority&appName=App-API-Cluster"
  )
  .then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => {
      console.log("Server is running in 3000 port");
    });
  })
  .catch(() => {
    console.log("Error");
  });
