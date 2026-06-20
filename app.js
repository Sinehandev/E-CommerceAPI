//dns
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
//env
require('dotenv').config({path:'./.env'});
require('express-async-errors');
//express
const express = require('express');
const app = express();

//rest of the pakages

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
//Database Connection
const connectDB = require('./db/connect');

//routers
const authroutes = require('./routes/authroutes');
const userroutes = require('./routes/userroutes');
const productroutes = require('./routes/productroutes');
const reviewroutes = require('./routes/reviewRoutes');
const orderroutes = require('./routes/orderroutes');
//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy',1);

app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
    message: 'Too many requests from this IP, please try again later'
}));     
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload());
app.use(cors());

app.use('/api/v1/auth',authroutes);
app.use('/api/v1/user',userroutes);
app.use('/api/v1/products',productroutes);
app.use('/api/v1/reviews',reviewroutes);
app.use('/api/v1/orders',orderroutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("DataBase Connected!")
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}`)
        });
    } catch (error) {
        console.error(error);
    }
};
start();