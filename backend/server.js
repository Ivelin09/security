const express = require('express');
const server = express();
const { upload } = require('./middlewares/multer');
const imageSchema = require('./schemas/image');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/security');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/images', express.static(path.join(__dirname, 'images')));

server.post("/api", upload.single('image'), async (req, res) => {
    const object = new imageSchema({
        imageUrl: req.file.path
    });

    await object.save();
    res.json({
        message: "asd"
    })
});

server.get("/api", async (req, res) => {
    const images = (await imageSchema.find({}).sort({ date: -1 })).map((image) => {
        return {
            imageUrl: image.imageUrl,
            createdAgo: (new Date() - image.createdAt)
        }
    }).reverse();
    console.log(images);
    res.json({
        message: images
    });
});

server.listen(8000, () => {
    console.log('listen');
});