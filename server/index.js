console.log('Starting server...'); // Trigger restart
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.url}`);
    next();
});

// In-Memory Storage Mode
console.log('⚠️ Running in In-Memory Storage Mode (No MongoDB)');

// Routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('AgriWeather API is running');
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is healthy (In-Memory)' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
