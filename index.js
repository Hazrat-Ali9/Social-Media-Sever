// Index.js
const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const mongoose = require('mongoose')
const path = require('path');
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const app = express();
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 3300;


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.ClOUD_SECRET,
});

// Configure Mongoose

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



// Configure multer for handling file uploads
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });


// Handle image upload
app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// Crud APi

// User API 
app.use('/api/users', require('./router/userRouter'))
app.use('/api/posts', require('./router/postRouter'))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
