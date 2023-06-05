import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  name: String,
  imgUrl: String,
  age: { type: Number, min: 18, max: 65 },
  location: String,
  distance: Number
})

const Card = mongoose.model('cards', cardSchema)

export default Card;