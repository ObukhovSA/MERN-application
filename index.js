import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { registerValidation, loginValidation, postCreateValidation }  from './validations.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';

import { UserController, PostController } from './controllers/index.js';


mongoose
    .connect('mongodb+srv://admin:admin@cluster0.iu5tnwj.mongodb.net/blog?retryWrites=true&w=majority',)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('error connecting to DB', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {   // Сохранение загружаемых фалов в директорию uploads
        cb(null, 'uploads');
    },

    filename: (_, file, cb) => {    // Название файла при загрузке
        cb(null, file.originalname); 
    },
});

const upload = multer({ storage });

// Логика express для чтения JSON запросов
app.use(express.json());
app.use('/uploads', express.static('uploads')); // get запрос на получение статичного файла

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);  // Запрос на авторизацию
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: '/uploads/${req.file.originalname}',               // Информация о загружаемом файле
    });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);



// Маршрутизация базового приложения
app.listen(5555, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server working');
});

