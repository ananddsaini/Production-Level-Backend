import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {

    // get user details
    // validate user detail -- for not empty
    // check if user already exists: username,email
    //check for i   

    // data 'form' ya 'json' se aayega to req.body se mil jaayega
    // url se data ke liye ??

    // * get user data from frontend
    const { fullName, email, username, password } = req.body
    console.log("email", email);

    // * Validation
    /* lengthy way 
    if(fullName===""){
        throw new ApiError(400,"fullname is required")
    }
   */
    if ([fullName, email, username, password].some((filed) => {
        return filed?.trim() === "";
    }
    )) {
        throw new ApiError(400, "All fields are required")
    }

    // * if user alredy existing or not
    // Jo hm mongoose mai user model create kiye hain ussin se check kr lenge ki user already exist krta hai ya nhi

   const existedUser= User.findOne({
        $or: [
            { username },  // array ke andar jitne bhi values check krni hai wo daal do
            { email }
        ]
})
if(existedUser){
    throw new ApiError(409, "User with email or username already exists")
}
// *  Check for avatar (file handling using multer) console.log krke feel lelo

const avatarLocalPath=req.files?.avatar[0]?.path; // 'req.file' hme multer se mila jaise 'req.body'
const coverImageLocalPath=req.files?.coverImage[0]?.path;
if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
}
// *Upload on cloudinary
const avatar= await uploadOnCloudinary(avatarLocalPath)
const coverImage  = await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
    throw new ApiError(400,"Avatar file is required")
}
// creating user object in database
User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url ||"",  // agar cover image hai to url nikaal lo nhi hai to empty rkho
    email,
    password,
    username: username.toLowerCase()
})
  //* checking for user creation
//mongodb har entry(like-User) ek _id field add kr deta hai

const createdUser= await User.findById(user._id).select(
    "-password -refreshToken" //by default har chij selected hota hai hum - use krke 
)
if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering a user")
    }
return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully")
)

})

export { registerUser };