import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from  'express-validator';


import { registerValidation }  from './validations/auth.js';

import UserModel from './models/User.js';

mongoose
    .connect('mongodb+srv://admin:admin@cluster0.iu5tnwj.mongodb.net/blog?retryWrites=true&w=majority',)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('error connecting to DB', err));

const app = express();

// Логика express для чтения JSON запросов
app.use(express.json());

app.get('/', (req, res) =>  {
    res.send('Holla bolla');
});

    // Запрос на авторизацию
app.post('/auth/register', registerValidation, async (req, res) => { 
    // Обработка ошибок в MongoDB 
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    // Хеширование пароля
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Документ создания модели пользователя
    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign({
        _id: user._id,
    }, 
    'secret', 
    {
        expiresIn: '30d',
    })

    const { passwordHash, ...userData } = user._doc;

    res.json({
        ... userData,
        token,
    });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Ошибка. Не удалось зарегистрироваться',
      });
    }
});

// Маршрутизация базового приложения
app.listen(5555, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server working');
});

