import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	// req.headers.authorization - инфо об авторизации
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

	if (token) {
		try {
			// кодовое слово должно совпадать
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.userId = decoded.id;
			next();
		} catch (e) {
			return res.status(403).json({
				message: 'Нет доступа',
			});
		}
	} else {
		return res.status(403).json({
			message: 'no access',
		});
	}
};
