import jwt from "jsonwebtoken";

export default (req, res, next) => {
	// req.headers.authorization - инфо об авторизации
	const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

	if (token) {
		try {
			// кодовое слово должно совпадать
			const decoded = jwt.verify(token, "secret122");

			req.userId = decoded._id;
			next();
		} catch (e) {
			return res.status(403).json({
				message: "Нет доступа",
			});
		}
	} else {
		return res.status(403).json({
			message: "no access",
		});
	}
};
