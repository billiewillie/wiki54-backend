import express from "express";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import { Users } from "./users.js";

// import { checkAuth, handleValidationErrors } from "./utils/index.js";
// import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";
// import { UserController, PostController } from "./controllers/index.js";

// mongoose
// 	.connect("mongodb+srv://admin:Blin-1987@cluster0.bem0i2q.mongodb.net/blog?retryWrites=true&w=majority")
// 	.then(() => console.log("DB ok"))
// 	.catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		if (!fs.existsSync("uploads")) {
			fs.mkdirSync("uploads");
		}
		cb(null, "uploads");
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// app.get("/auth/me", checkAuth, UserController.getMe);
// app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);
// app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register);

app.post("/upload", upload.single("image"), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
});

app.get("/", (req, res) => {
	const { q } = req.query;
	const keys = ["name", "surname", "email"];

	console.log(req.query);

	const search = (data) => {
		return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(q)));
	};

	q ? res.json(search(Users).slice(0, 5)) : res.json(Users.slice(0, 5));
});

// app.get("/posts", PostController.getAll);
// app.get("/posts/:id", PostController.getOne);
// app.delete("/posts/:id", checkAuth, PostController.remove);
// app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
// app.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

app.listen(4444, (err) => {
	if (err) return console.log(err);
	console.log("server ok");
});
