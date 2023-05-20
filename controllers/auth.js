import { StatusCodes } from "http-status-codes"
import User from "../models/User.js"
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'

const register = async (req,res,next) => {
    const {email ,name ,password }  = req.body
   if(!email|| !name || !password){
      throw new BadRequestError('Please Provide all value')
   }
 const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }
    const user = await User.create({email, name, password})
    const token =  user.createJWT()
    res.status(StatusCodes.OK).json({user: {
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name
    }, token, location: user.location})
}
const login = async (req,res,next) => {
    const {email, password} = req.body
    if(!email ||  !password ){
        throw new BadRequestError('please provide all value')
    }
    const user = await User.findOne({email}).select('+password')
    console.log(user);
    if(!user){
        throw new UnauthenticatedError('Invalid Credential')
    }
    const isCorrectPassword = await user.comparePassword(password)
    if(!isCorrectPassword){
        throw new UnauthenticatedError('Invalid Credential')
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({
        user, token, location: user.location
    })
}
const updatedUser = async (req,res,next) => {
    const {email, name, location , lastName} =req.body
    if(!email || !name || !location || !lastName){
        throw new BadRequestError('Please Provide all value')
    }
    const user = await User.findOne({_id: req.user.userId})
    user.email = email;
    user.name = name;
    user.location = location
    user.lastName = lastName
    await user.save()
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        user, token, location: user.location
    })
}

export {register, login, updatedUser}

