const express = require('express');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/database');
const globalErrorHandler = require('./middleware/errorMiddleware');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

//Use .env file in config folder
dotenv.config();

//Connect To Database
connectDB();

const app = express();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(authRoutes);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});