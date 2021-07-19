// require("dotenv").config();
// const  mongoose  =  require('mongoose');

// const uri = process.env.DB_CONNECTION
// mongoose
//   .connect(uri, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
//   })
//   .then(x => {
//     console.log(
//       `Connected to Mongo! Database name: "${x.connections[0].name}"`
//     );
//   })
//   .catch(err => {
//     console.error("Error connecting to mongo", err);
//   });

const mongoose = require("mongoose")
require("dotenv/config")

//connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to db")
  }
)

