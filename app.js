const express = require('express');
const app = express();
const port = 3000; 
const mongoose = require('mongoose');

app.use(express.json());

const dbURI = 'mongodb+srv://randyluna93:FZasa1ielX2Iknw9@cluster0.ajkai7b.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
    // Aquí puedes especificar la colección que deseas utilizar
    const collectionName = 'pokemons';

    // Obtener la referencia a la colección
    const db = mongoose.connection;
    const collection = db.collection(collectionName);

    // Realizar operaciones con la colección
    // Por ejemplo, obtener todos los documentos en la colección
    collection.find({}).toArray((err, documents) => {
      if (err) {
        console.error('Error al obtener documentos:', err);
      } else {
        console.log('Documentos en la colección:', documents);
      }
      // Cierra la conexión de mongoose cuando hayas terminado
      mongoose.connection.close();
    });

  })
  .catch(err => {
    console.error('Error al conectar a MongoDB Atlas:', err);
  });

// esquema de la colección de pokémons
const pokemonSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  type: String,
  description: String,
  hasEvolution: Boolean,
  weaknesses: [String]
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);


// obtener todos los pokémons
app.get('/pokemons', async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los pokémons', error: err });
  }
});


app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}/pokemons`);
});

