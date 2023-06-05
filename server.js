import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Card from './dbCards.js';

// APP CONFIG 
const app = express();
const port = process.env.PORT || 8080
const connection_url = 'mongodb+srv://admin:idimmachukwu@cluster0.of0jgdx.mongodb.net/?retryWrites=true&w=majority'
// mongodb + srv://promise:8KtalcaoHUeHhCoR@cluster0.of0jgdx.mongodb.net/?retryWrites=true&w=majority

// MIDDLEWARES
app.use(express.json());
app.use(Cors())

// DB CONFIG

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  // Connection successful, create indexes if needed
  const Model = mongoose.model('cards');
  Model.createIndexes();
}).catch((err) => {
  // Connection error
  console.error('Error connecting to MongoDB:', err);
});

// API ENDPOINTS
app.get('/', (req, res) => res.status(200).send('hello Promise, this works fine'))

app.post('/tinder/cards', (req, res) => {
  const dbCard = req.body;

  Card.create(dbCard)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


app.get('/tinder/cards', (req, res) => {
  Card.find()
    .exec()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});



// LISTENER 

app.listen(port, () => console.log(`listening on localhost: ${port}`));