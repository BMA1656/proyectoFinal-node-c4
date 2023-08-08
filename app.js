const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const path = require('path');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const dbURI = 'mongodb+srv://randyluna93:FZasa1ielX2Iknw9@cluster0.ajkai7b.mongodb.net/test';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Conexión exitosa a MongoDB Atlas');
    console.log('Base de datos:', result.connections[0].name);
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB Atlas:', err);
  });

const pokemonSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  descripción: { type: String, required: true },
  tieneEvolucion: { type: Boolean, required: true },
  debilidades: { type: [String], required: true }
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema, 'pokemons'); // 'pokemons' es el nombre de la colección

app.get('/pokemons', async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los pokémons', error: err });
  }
});

app.post('/pokemons', async (req, res) => {
  const newPokemonData = req.body;
  
  // Realiza validación de datos aquí, por ejemplo:
  if (!newPokemonData.nombre || !newPokemonData.tipo || !newPokemonData.descripción) {
    return res.status(400).json({ message: 'Faltan datos obligatorios para crear el Pokémon' });
  }

  try {
    const newPokemon = await Pokemon.create(newPokemonData);
    res.status(201).json(newPokemon);
  } catch (err) {
    console.error('Error al agregar el Pokémon:', err);
    res.status(500).json({ message: 'Error al agregar el pokémon', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
