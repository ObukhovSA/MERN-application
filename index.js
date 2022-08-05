import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose
    .connect('mongodb+srv://admin:admin@cluster0.iu5tnwj.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('error connecting to DB', err));

const app = express();

// Логика express для чтения JSON запросов
app.use(express.json());

app.get('/', (req, res) =>  {
    res.send('Holla bolla');
});

// Запрос на авторизацию
app.post('/auth/login', (req, res) => { 
    console.log(req.body);
// Генерация токена по запросу
    const token = jwt.sign(
        {   
         email: req.body.email,
         fullname: 'Egor Alexandrovich',
        }, 
        'matic', // Хеширование данных по специальному ключу
    );
 
    res.json({
        success: true,
        token,
    });

});
// Маршрутизация базового приложения
app.listen(5555, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server working');
});

