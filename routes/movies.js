const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', async(req, res)=>{
   // res.send('Hellow Router I am here');
    try {
        const movies = await Movie.find();
        let count = await Movie.count();
        res.json(movies);
        console.log(count);
        
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.get('/:id', getMovie, (req, res)=>{
    //res.send(req.params.id);
    res.json(res.movie);
});

router.post('/', async(req, res)=>{
    const movie = new Movie({
        movieDirector: req.body.movieDirector,
        movieTitle: req.body.movieTitle
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getMovie, async(req, res)=>{

    try {
        await res.movie.remove();
        res.json({message: 'Deleted Movie'});
    } catch (err) {
        res.status(500).json({message: 'Could not found movie'});
    }
});

router.patch('/:id', getMovie, async (req, res)=>{
    if(req.body.movieTitle != null) {
        res.movie.movieTitle = req.body.movieTitle;
    }
    if(req.body.movieDirector != null) {
        res.movieDirector = req.body.movieDirector;
    }
    try {
        const updateMovie = await res.movie.save();
        res.json(updateMovie);

    } catch (err) {
        res.status(400).json({ message: 'Movie not updated' });
    }
});

async function getMovie(req, res, next) {
    let movie;
    try{
        movie = await Movie.findById(req.params.id);
        if(movie == null) {
            return res.status(400).json( {message: 'Cannot find Movie'} );
        }
    } catch (err) {
        return res.status(500).json( {message: 'The ID selected was not found'} );
    }
    res.movie = movie;
    next();
}

module.exports = router;