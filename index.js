import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
});

app.post('/auth/login', (req, res) => {
  console.log(req.body);
	res.json({
		token: '1234',
		user: {
			id: 1,
			name: 'John Doe',
			username: 'johndoe',
		},
		message: 'Login successful',
		success: true,
	});
});

app.listen(4444, err => {
	if (err) {
		return console.log('something bad happened:', err)
	}

	console.log('Server started on port 4444')
})
