import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
const router=Router()

router.route("/register").post(
upload.fields([ // * 'fields' accepts array
 // receving two files (avatar and cover image hence we have to create object for these 2)

    {
        name:"avatar",
        maxCount: 1,          // how many files are going to accept

     } ,
    {
        name:"coverImage", 
        maxCount:1           // ek hi cover image lenge
    }
   


]),
registerUser

)



export default Router