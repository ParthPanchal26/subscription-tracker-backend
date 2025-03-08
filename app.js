import express from 'express';
import {PORT} from './config/env.js'
const app = express()

app.get('/', (req, res) => {
    res.send("Server is running")
})

app.listen(PORT, () => {
    console.log(`Server listening at : http://localhost:${PORT}`);
})