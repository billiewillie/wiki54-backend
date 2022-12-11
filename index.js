import fs from 'fs';
import cors from 'cors';
import multer from 'multer';
import express from 'express';
import * as dotenv from 'dotenv';
const PORT = process.env.PORT || 4444;

dotenv.config();

import connectDB from './utils/db.js';
import UserRoutes from './routes/userRoutes.js';
import PostsRoutes from './routes/postsRoutes.js';
import SearchRoutes from './routes/searchRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

connectDB();

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

app.post('/upload', upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
});

app.use('/api', SearchRoutes);
app.use('/api/posts', PostsRoutes);
app.use('/api/users', UserRoutes);

app.use(errorHandler);

app.listen(PORT, (err) => {
	if (err) return console.log(err);
	console.log('server ok');
});
