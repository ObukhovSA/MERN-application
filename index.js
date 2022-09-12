import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation }  from './validations.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';


mongoose
    .connect('mongodb+srv://admin:admin@cluster0.iu5tnwj.mongodb.net/blog?retryWrites=true&w=majority',)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('error connecting to DB', err));

const app = express();

// Логика express для чтения JSON запросов
app.use(express.json());

 // Запрос на авторизацию
app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
//app.delete('/posts', PostController.remove);
//app.patch('/posts', PostController.update);



// Маршрутизация базового приложения
app.listen(5555, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server working');
});

