import express from 'express';
import {PORT} from './config/env.js'
import {userRoutes, subscriptionRoutes, authRoutes} from './routes/index.js';
import { connectDB } from './db/database.js';

const app = express()

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/subscriptions', subscriptionRoutes)

app.listen(PORT, () => {
    console.log(`Server listening at : http://localhost:${PORT}`);
    connectDB();
})