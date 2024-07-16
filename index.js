import express from 'express'
import mongoose from 'mongoose'
import { registerValidation, loginValidation } from './validations/auth.js'
import checkAuth from './utils/checkAuth.js'
import { register, login, profile } from './controllers/UserController.js'

mongoose
	.connect(
		'mongodb+srv://xxumpocmb:giAEBOJDOnrcXPLo@cluster0.owwom9f.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0'
	)
	.then(() => console.log('db connected'))
	.catch(err => console.log(err))

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/auth/register', registerValidation, register)

app.post('/auth/login', loginValidation, login)

app.get('/auth/profile/', checkAuth, profile)

app.listen(4444, err => {
	if (err) {
		return console.log('something bad happened:', err)
	}

	console.log('Server started on port 4444')
})
