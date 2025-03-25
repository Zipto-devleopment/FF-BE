const mongose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()

const connection=mongose.connect(process.env.MONGOOSE)
console.log("Connect To DB")

module.exports=mongose.connection