const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // reference a l'utilisateur
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true });

module.exports = mongoose.model('Article', articleSchema);