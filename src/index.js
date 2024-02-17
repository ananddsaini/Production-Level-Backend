//  require('dotenv').config({path:'./env'});
import connectDB from "./db/index.js";
import 'dotenv/config'
import express from "express";


//  dotenv.config({   // configuring dotenv 
//    path:'./env'   //assinging path of enviromental variables
// })
const app=express()

/*
;async function ConnectDB(){
 try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
app.on //use to check the error,
       // wheater our express app is connected or not 
} catch (error) {
    console.log("ERROR: ",error)
    throw err
 }
}
*/

// *** More professional way to write the function
/*
(async ()=>{
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${ DB_NAME}`)
        
    } catch (error) {
        console.error("ERROR: ", error)
        
    }
})()
*/



connectDB()
.then(()=>{
    app.listen(process.env.PORT||3400,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    })


})
.catch((err)=>{cosole.log("Error: ",err)})

