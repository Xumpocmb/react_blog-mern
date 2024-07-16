import jwt from 'jsonwebtoken'

export default (req, res, next) => {
	const token = ((req.headers && req.headers.authorization) || '').replace(
		/Bearer\s?/,
		''
	)
	if (!token) {
		return res.status(403).send({
			success: false,
			message: 'No token provided',
		})
	}

	try {
		const decoded = jwt.verify(token, 'secret')
		req.userId = decoded._id
		next();
	} catch (err) {
		return res.status(401).send({
			success: false,
			message: 'Failed to authenticate token',
		})
	}
}

// export default function checkAuth({ req }) {
//     const token = (req.headers && req.headers.authorization) || '';
//     if (!token) {
//         return null;
//     }
//     try {
//         const decoded = jwt.verify(token, 'secret');
//         return decoded;
//     } catch (err) {
//         return null;
//     }
// }
