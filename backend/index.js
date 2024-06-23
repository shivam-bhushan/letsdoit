import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

connectDB();

app.use(cors()); // Allows requests from any origin

app.use(express.json({ extended: false }));

app.use('/api/auth', (await import('./routes/auth.js')).default);
app.use('/api/tasks', (await import('./routes/tasks.js')).default);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});