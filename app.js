const express = require('express');
const validate = require('./validate');
const app = express();
const moviesRouter = require('./routes/movies');
const PORT = process.env.port || 3000;
const mongoose = require('mongoose');
const db = mongoose.connection;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/movies";

app.use(express.static('public'));

//mongoose.connect("mongodb://localhost/movies");
mongoose.connect(DATABASE_URL, { useNewUrlParser: true }, { useUnifiedTopology: true });

db.on('error', error => console.error(error));
db.once('open', ()=> console.log('Connected to Database'));

app.use(express.json());
app.use('/movies', moviesRouter);



app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));