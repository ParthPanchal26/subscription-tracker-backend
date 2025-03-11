import express from 'express';
import { PORT } from './config/env.js'
import { userRoutes, subscriptionRoutes, authRoutes } from './routes/index.js';
import { connectDB } from './db/database.js';
import errorMiddleware from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/subscriptions', subscriptionRoutes)

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server listening at : http://localhost:${PORT}`);
    connectDB();
})