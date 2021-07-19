const express = require("express")
const app = express()
const questionsRoute = require("./routes/questions")
const authRoute = require("./routes/auth")
const userRecordRoute = require('./routes/userRecord')
const cors = require("cors")
require("dotenv").config()
require("./config/db")

app.use(cors())
app.use(express.json())
app.use("/questions", questionsRoute)
app.use("/auth", authRoute)
app.use('/userRecord', userRecordRoute)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})