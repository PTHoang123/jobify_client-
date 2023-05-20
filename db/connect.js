import mongoose from "mongoose";
import {ServerApiVersion} from 'mongodb'
const   connectDb =  (url) => {
    return   mongoose.connect(url, {
         useNewUrlParser: true,
         useUnifiedTopology: true, 
         autoIndex: false,
        // serverApi: ServerApiVersion.v1
        
    })
}
export default connectDb


