import dotenv from 'dotenv';  
import connectDB from './db/index.js';
import {app} from './app.js';

dotenv.config();

console.log(process.env.MONGODB_URI)
connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})