const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    imageUrl: {
        type: String
    },
}, {
    timestamps: true
});

const image = mongoose.model('Image', imageSchema);

module.exports = image;