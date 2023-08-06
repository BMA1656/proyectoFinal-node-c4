const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const path = require('path');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const dbURI = 'mongodb+srv://randyluna93:FZasa1ielX2Iknw9@cluster0.ajkai7b.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB Atlas:', err);
  });

const pokemonSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  type: String,
  description: String,
  hasEvolution: Boolean,
  weaknesses: [String]
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

app.get('/pokemons', async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los pokémons', error: err });
  }
});

app.post('/add-pokemon', async (req, res) => {
  try {
    const newPokemon = new Pokemon(req.body);
    await newPokemon.save();
    res.status(201).json({ message: 'Pokémon agregado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar el Pokémon', error: err });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
