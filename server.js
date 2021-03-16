const express = require("express")
require("dotenv").config();
const dbConnect = require("./config/connectDB")
const app = express();


const PORT = process.env.PORT
//Connect with database
dbConnect()

// Midlware routing for body parser
app.use(express.json())
// Create route
app.use("/api/person", require("./routes/person"));


app.listen(PORT, (err) =>
  err
    ? console.error(err)
    : console.log(`server is running on http://localhost:${PORT}...`)
);