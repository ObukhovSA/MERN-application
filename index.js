import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Holla bolla');
});

 // Запрос на авторизацию
app.post('/auth/login', (req, res) => { 
    console.log(req.body);

    const token = jwt.sign({
        email: req.body.email,
        fullname: 'Egor Alexandrovich',
    }, 
    'matic', 
    );

    res.json({
        success: true,
        token,
    });

});

app.listen(5555, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server working');
});