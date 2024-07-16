import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import UserModel from '../models/User.js'

export const register = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const rawPassword = req.body.password
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(rawPassword, salt)

		const doc = new UserModel({
			email: req.body.email,
			password: hash,
			name: req.body.name,
		})

		const user = await doc.save()
		const { password, ...userData } = user._doc

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
			message: 'Failed to create user..',
		})
	}
}

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email })

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			})
		}

		const isValidPass = bcrypt.compareSync(
			req.body.password,
			user._doc.password
		)

		if (!isValidPass) {
			return res.status(404).json({
				success: false,
				message: 'Invalid login or password',
			})
		}

		const { password, ...userData } = user._doc

		const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '30d' })

		res.json({
			success: true,
			token: token,
			...userData,
			message: 'User logged in!',
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Failed to login user..',
		})
	}
}

export const profile = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId)

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			})
		}

		const { password, ...userData } = user._doc

		res.json({
			success: true,
			...userData,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Failed to get user..',
		})
	}
}
