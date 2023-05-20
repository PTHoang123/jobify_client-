import {UnauthenticatedError} from '../errors/index.js'
import jwt from 'jsonwebtoken'

const auth = async(req,res,next) => {
    const authHeaders = req.headers.authorization;
    console.log(authHeaders);
    if(!authHeaders || !authHeaders.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication Invalid')
    }
    const token = authHeaders.split(" ")[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        req.user = { userId: payload.userId };
       next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalidd')
    }
}
export default auth;
