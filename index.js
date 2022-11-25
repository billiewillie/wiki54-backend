import fs from 'fs';
import cors from 'cors';
import multer from 'multer';
import express from 'express';
import mongoose from 'mongoose';

import { Users } from './users.js';
import { Posts } from './posts.js';

import { handleValidationErrors } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';
import { loginValidation, postCreateValidation } from './validations.js';

mongoose
	.connect('mongodb://localhost:27017/wiki54')
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		if (!fs.existsSync('uploads')) {
			fs.mkdirSync('uploads');
		}
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);

app.post('/upload', upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
});

app.get('/', (req, res) => {
	const { q } = req.query;
	const keys = ['name', 'surname', 'email'];

	const search = (data) => {
		return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(q)));
	};

	q ? res.json(search(Users).slice(0, 5)) : res.json(Users.slice(0, 5));
});

app.get('/:department', (req, res) => {
	const { department } = req.params;
	const search = (data) => {
		return data.filter((item) => item.department === department);
	};
	res.json(search(Posts));
});

app.get('/:department/:id', (req, res) => {
	const { id } = req.params;
	const search = (data) => {
		return data.filter((item) => item.id === Number(id))[0];
	};
	res.json(search(Posts));
});

app.get('/:department/:id/edit', (req, res) => {
	const { id } = req.params;
	const search = (data) => {
		return data.filter((item) => item.id === Number(id))[0];
	};
	res.json(search(Posts));
});

app.post('/:department/:id', async (req, res) => {
	const { id } = req.params;
	console.log(req.body);
});

app.post('/:department/createPost', async (req, res) => {
	console.log(req.body);
});

// app.get("/posts", PostController.getAll);
// app.get("/posts/:id", PostController.getOne);
// app.delete("/posts/:id", checkAuth, PostController.remove);
// app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
// app.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

app.listen(4444, (err) => {
	if (err) return console.log(err);
	console.log('server ok');
});
