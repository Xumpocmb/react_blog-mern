import { body } from 'express-validator'

export const registerValidation = [
	body('email', 'Email is not valid').isEmail(),
	body('password', 'Password must be at least 5 characters').isLength({
		min: 5,
	}),
	body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
]

export const loginValidation = [
    body('email', 'Email is not valid').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({
        min: 5,
    }),
]