const mongoose  = require("mongoose");

// const daySchema = new mongoose.Schema({
//   date : Number,
//   activity: [String],
// });

// const monthSchema = new mongoose.Schema({
//     day:daySchema,
//     month:Number
// })

// const yearSchema = new mongoose.Schema({
//     month:monthSchema,
//     year:Number
// })

const dateSchema= new mongoose.Schema({
  day:Number,
  month:Number,
  year:Number,
  activity:[String]
})


// const Year = new mongoose.model("User", yearSchema);
const Date=new mongoose.model("Date",dateSchema);
module.exports={Date}