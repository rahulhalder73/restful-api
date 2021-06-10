const validate = (req, res) => {

    if(!req.body.lesson || req.body.lesson.length < 3) {
	
		res
			.status(400)
			.send('Lesson required and should be at least 3 characters long');
	}
};

module.exports = validate;

