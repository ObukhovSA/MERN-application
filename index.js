import express from 'express';

const app = express();

app.get('/', (req, res) => {

    res.send('Priver barash:');
});

app.listen(2222, (err) => {
    if (err) {
      return console.log('err');
    }

    console.log('Vse zdorovo');
})