require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express()

// routers
const authRouter = require('./routes/authRoutes')


//database
const connectDB = require('./db/connect')
//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('E-commerce API')
})






app.use('/api/v1/auth', authRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is listerning on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();
