import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { registerValidation, loginValidation } from './validations/auth.js'
import { validationResult } from 'express-validator'

import UserModel from './models/User.js'

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

app.post('/auth/register', registerValidation, async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const password = req.body.password
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)

		const doc = new UserModel({
			email: req.body.email,
			password: hash,
			name: req.body.name,
		})

		const user = await doc.save()
		const { passwordHash, ...userData } = user._doc

		const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '30d' })

		res.json({
			success: true,
			token: token,
			...userData,
			message: 'User created',
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
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
