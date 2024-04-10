import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parentParentParentDir = path.resolve(__dirname, '../../');
const envPath = path.resolve(parentParentParentDir, '.env');

dotenv.config({ path: envPath });
const { MONGODB_URI } = process.env;

console.log(MONGODB_URI); 

mongoose.connect(MONGODB_URI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

export default db;