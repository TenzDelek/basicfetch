import mongoose from 'mongoose';

export async function connecttoDB() {
    try{
        mongoose.connect(process.env.MONGOURL);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully")
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error' + err);
            process.exit();
       })
    } catch (error) {
        console.log(error);
    }
}