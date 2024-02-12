import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/'

export const connectToDatabase = mongoose.connect(MONGO_URL).then(() => {
    console.log('Connecting to database ok JC bibi')
}).catch((error: any) => {
    console.log('Failed to connect to database JC')
});