const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

    movieID: {
        type: Number,
        //required: true
    },

    movieDirector: {
        type: String,
        required: true
    },

    movieTitle: {
        type: String,
        required: true
    },

    movieDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Movie', movieSchema);
