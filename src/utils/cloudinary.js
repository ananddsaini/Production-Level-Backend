import {v2 as cloudinary} from "cloudinary"
import { response } from "express";
import fs from "fs"
// yha local server se file ko clodinary pr send krenge
//after uploading file from local to cloudinary we remove the file from local server
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLODINARY_API_KEY, 
  api_secret: process.env.CLODINARY_API_SECRET
});

const uploadOnCloudinary=async (localFilePath)=>{
try {
  if(!localFilePath) return null
  // upload the file on cloudinary
  const resposne=await cloudinary.uploader.upload(localFilePath,
    {
      resource_type:"auto"
    })// file has been uploaded successfully
    console.log("File is uploaded on cloudinary",response.url)
return resposne;
} 
catch (error) {
  fs.unlinkSync(localFilePath)  //removing the localfile in case of error(upload operation on cloudinary got failed) here it is confirmed that the file was uploaded on local storage
  return null;
}

}

export {uploadOnCloudinary};
/* 
cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });
  */