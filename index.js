import express from 'express';
import mongoose from 'mongoose';
import { registerValidation }  from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController';

mongoose
    .connect('mongodb+srv://admin:admin@cluster0.iu5tnwj.mongodb.net/blog?retryWrites=true&w=majority',)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('error connecting to DB', err));

const app = express();

// Логика express для чтения JSON запросов
app.use(express.json());

 // Запрос на авторизацию
app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidation, UserController.register) ;
app.get('/auth/me', checkAuth, UserController.getMe);

// Маршрутизация базового приложения
app.listen(5555, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server working');
});

