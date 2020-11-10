const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    name: String,
    description: String,
    force: Number,
    attack:Number,
    image: String,
    likes:{
        type: Number,
        default: 0,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);