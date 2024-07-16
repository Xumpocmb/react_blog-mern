import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

mongoose
	.connect(
		'mongodb+srv://xxumpocmb:giAEBOJDOnrcXPLo@cluster0.owwom9f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
	)
	.then(() => console.log('db connected'))
	.catch(err => console.log(err))

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/auth/login', (req, res) => {
	console.log(req.body)

	const jwt_token = jwt.sign(
		{
			email: req.body.email,
		},
		'secret'
	)

	res.json({
		token: jwt_token,
		success: true,
	})
})

app.listen(4444, err => {
	if (err) {
		return console.log('something bad happened:', err)
	}

	console.log('Server started on port 4444')
})
