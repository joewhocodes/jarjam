const express = require('express');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/database');
const globalErrorHandler = require('./middleware/errorMiddleware');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');



const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");








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





cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'DEV',
    },
});

const upload = multer({ storage: storage });

app.post("/", upload.single("picture"), async (req, res) => {
    return res.json({ picture: req.file.path });
});
