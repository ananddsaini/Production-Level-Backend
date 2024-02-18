import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,   //strings like "  hello", or "hello ", or "  hello ", would end up being saved as "hello" in Mongo
            index: true
        },

        email:
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,   //strings like "  hello", or "hello ", or "  hello ", would end up being saved as "hello" in Mongo

        },
        fullName:
        {
            type: String,
            required: true,
            trim: true,   //strings like "  hello", or "hello ", or "  hello ", would end up being saved as "hello" in Mongo
            index: true
        },
        avatar:
        {
            type: String, //cludinary url
            required: true,
        },
        coverImage:
        {
            type: String,
        },

        watchHistory: [
            {
            type: Schema.Types.ObjectId,
            ref: "Video"
            }
        ],
        password:
        {
            type:String,
            required:[ture,'Password is required']
        },
        refreshToken:
        {
            type:String
        }

    },
    {
        timestamps:true
    }

)

userSchema.pre("save",async function(next){
if(!this.isModified("password")) return next;

    this.password=bcrypt.hash(this.password,10) //10 is number of round it be 8 also
next()
// above logic is to encrypt password
})

userSchema.methods.isPasswordCorrect= async function(password){
return await bcrypt.compare(password, this.password)

//'passsword' actual password provided and 'this.password' is encrypted one 

}
// 'methods' is a object inside userSchema isPasswordCorrect is a method added by us(custom method) inside methods 

userSchema.methods.generateAccessToken= function(){
  return  jwt.sign( // sign method use for generating token
        {
          _id:this._id,
          email:this.email,
          username:this.username,
          fullName:this.fullName
        // payloadName(for token): 'this.thing' is comming from database(mongodb)
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY //expiry object
        }
    )

}
userSchema.methods.generateRefreshToken= function(){
    return  jwt.sign(
          {
            _id:this._id,
            
            //payloadName: this.thing is comming from database
          },
          process.env.REFRESH_TOKEN_SECRET,{
              expiresIn:process.env.REFRESH_TOKEN_EXPIRY
          }
      )
  // refresh token gets refreshed frequently
  }


export const User = mongoose.model("User", userSchema)

