const express = require('express');
const validate = require('./validate');
const app = express();
const validate = require('./validate');
const PORT = process.env.port || 3000;

app.use(express.json());
// Proving a point
const lesson = [
	{ id: 1, lesson: 'Lesson 1'},
	{ id: 2, lesson: 'Lesson 2'},
	{ id: 3, lesson: 'Lesson 3'}
];

// GET ROUTE
app.get('/', (req, res)=>{
	res.send('Hello World');
});

// GET ROUTE
app.get('/api/lessons', (req, res)=> res.send(lesson));

// GET ROUTE
app.get('/api/lessons/:id', (req, res)=>{
	
	// Loopup for existing lesson
	const lesson = lessons.find(l => l.id === parseInt(req.params.id) );
	
	// If Lesson does not exist, then return a 404 error not found
	if(!lesson) res.status(404).send('The Lesson ID given was not found');

	res.send(lesson);
});

// POST ROUTE
app.post('/api/lessons', (req, res)=>{

	// Validate the input
	// If input is invalid, then return a 400 error - a bad request	
	validate(req, res);
	const lesson = {	
		id: lessons.length + 1,
		lesson: req.body.lesson
	}	
	lessons.push(lesson);
	req.send(lesson);
});

// PUT ROUTE
app.put('/api/lessons:id', (req, res)=>{

	// Loopup for existing lesson
	const lesson = lessons.find(l => l.id === parseInt(req.params.id));
	
	// If Lesson does not exist, then return a 404 error not found	
	if(!lesson)	res.status(404).send('The Lesson ID given was not found');
	
	// Validate the input
	// If input is invalid, then return a 400 error - a bad request
    validate(req, res);
	
	// Update the specified lesson
	lesson.lesson = req.body.lesson
	
	// Return the updated lesson to the client, in the browser
	res.send(lesson);	
});

// DELETE ROUTE
app.delete('/api/lessons/:id', (req, res)=>{

	// Loopup for existing lesson
	const lesson = lessons.find(l => l.id === parseInt(req.params.id));
	
	// If Lesson does not exist, then return a 404 error not found	
	if(!lesson)	res.status(404).send('The Lesson ID given was not found');
	
	// Delete Record
	const index = lessons.indexOf(lesson);
	lessons.splice(index, 1);
	
	// Return the Lesson
	res.send(lesson);
});

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));