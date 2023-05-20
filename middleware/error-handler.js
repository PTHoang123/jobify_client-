import { StatusCodes } from "http-status-codes"


const errorHandlerMiddleware = (err,req,res,next) => {
    console.log(err);
    const defaultError = {
        status : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Some thing went wrong, try again'  
    }
    if(err.name == "ValidationError"){
        defaultError.status = StatusCodes.BAD_REQUEST
        defaultError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(',')
    }
    if(err._message == "User validation failed"){
        defaultError.status = StatusCodes.BAD_REQUEST
        defaultError.msg = err.message
    }
    console.log(defaultError.status);
    // res.status(defaultError.status).json({msg: err})
    res.status(defaultError.status).json({msg: defaultError.msg})
}
export default errorHandlerMiddleware