import express from 'express';

const app = express();

app.get('/', (req, res) =>{
    res.send('Holla bolla');
});

app.listen(5555, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server working');
});