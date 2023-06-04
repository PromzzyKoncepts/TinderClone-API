import express from 'express';
import mongoose from 'mongoose';
import Card from './dbCards';

// APP CONFIG 
const app = express();
const port = process.env.PORT || 8080
const connection_url = 'mongodb+srv://admin:idimmachukwu@cluster0.of0jgdx.mongodb.net/?retryWrites=true&w=majority'

// DB CONFIG

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

// API ENDPOINTS

app.get('/', (req, res) => res.status(200).send('hello Promise'))

app.post('/tinder/card', (req, res) => {
  const dbCard = req.body;

  Card.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
});

app.get('/tinder/card', (req, res) => {
  const dbCard = req.body;

  Card.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
});


// LISTENER 

app.listen(port, () => console.log(`listening on localhost: ${port}`))