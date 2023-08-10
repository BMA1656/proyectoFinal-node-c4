const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  nombre: { type: String },
  tipo: { type: String },
  info: { type: String }, // Cambiamos de 'pokeInfo' a 'info'
  tieneEvolucion: { type: Boolean },
  debilidades: { type: [String] },
  imagePath: { type: String }
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema, 'pokemons');

const dbURI = 'mongodb+srv://randyluna93:FZasa1ielX2Iknw9@cluster0.ajkai7b.mongodb.net/test';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Conexión exitosa a la base de datos');

    // Obtener todos los Pokémon de la base de datos
    const pokemons = await Pokemon.find({});

    // Modificar los Pokémon y actualizar la base de datos
    for (const pokemon of pokemons) {
      await Pokemon.findByIdAndUpdate(pokemon._id, {
        $rename: { 'pokeInfo': 'info' } // Cambia el nombre del campo
      }, { new: true });
    }

    console.log('Actualización completada');
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err);
  })
  .finally(() => {

    mongoose.connection.close();
  });