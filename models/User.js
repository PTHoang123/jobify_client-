import mongoose from "mongoose";
import validator from "validator";
import { BadRequestError } from "../errors/index.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: Schema.Types.String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validateEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
    
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'lastName',
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'my city',
  },
});

async function validateEmail(email) {
  if (!validator.isEmail) throw new Error("Please enter a valid email address.")
}
UserSchema.pre('save', async function(){
  if(!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.createJWT = function (){
  return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}
UserSchema.methods.comparePassword = async function (candidatePassowrd){
    const isMatch = await bcrypt.compare(candidatePassowrd,this.password )
    return isMatch
}
export default mongoose.model("User", UserSchema);
