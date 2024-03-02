import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN, //option 1 for CORS read docmentation for more deatail
    credentials: true
}))
// Data is retriving(comming) from many sources in our backend like from URL, JSON, BODY form
// we oraganise all these incoming data and set some limit so that our server would not crash due to flooding of data
// Followings are some configuration
app.use(express.json({limit:"16kb"})) // form bhara tb data le liya
app.use(express.urlencoded({
    extended:true, // extended allow us to write object inside object
    limit:"16kb"})) // when incoming data is from URL

app.use(express.static("public")) // static folder allow us to store file, pdf (static assets ) inside 'public' folder
app.use(cookieParser()) // it also has some option like CORS **It allow us to access and set cookies from user browser 

//routes import
import userRouter from './routes/user.routes.js'

// routes declaration
// using middleware to bring router
app.use("/api/v1/users",userRouter);


//http://localhost:8000/api/v1/users/register



export {app}