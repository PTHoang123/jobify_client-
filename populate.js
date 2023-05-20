import {readFile} from 'fs/promises'

import dotenv from 'dotenv'
dotenv.config()

import connectDb from './db/connect.js'

import Job from './models/Job.js'

const start = async ()  => {
    try {
        await connectDb(process.env.MONGO_URL)
        await Job.deleteMany()
        console.log(import.meta.url);
        const jsonProduct = JSON.parse( 
           await readFile(new URL('./mock-data.json' , import.meta.url))
            )
        await Job.create(jsonProduct)
        console.log('!Sucess');
        process.exit(0)
    } catch (err) {
      console.log(err);
      process.exit(1)
    }
}
start()