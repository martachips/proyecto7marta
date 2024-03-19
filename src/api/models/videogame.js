const mongoose = require('mongoose');

const videogameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['adventures', 'battle', 'terror', 'races', 'sports', 'platform']
    },
    verified: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true,
    collection: 'videogames'
  }
);

const Videogame = mongoose.model('videogames', videogameSchema, 'videogames');
module.exports = Videogame;
