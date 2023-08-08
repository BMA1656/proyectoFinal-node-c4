 async function getPokemons() {
  const response = await fetch('/pokemons');
  const pokemons = await response.json();
  return pokemons;
}




document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pokemonForm');
  const pokemonList = document.getElementById('pokemonList');

  // Función para obtener y mostrar la lista de pokémones
  const fetchPokemonList = async () => {
    try {
      const response = await fetch('/create');
      if (response.ok) {
        const pokemons = await response.json();
        // Limpiar el contenido actual del elemento pokemonList
        pokemonList.innerHTML = '';

        // Mostrar la lista de pokémones en pokemonList
        pokemons.forEach(pokemon => {
          const listItem = document.createElement('li');
          listItem.textContent = `Nombre: ${pokemon.name}, Tipo: ${pokemon.type}, Descripción: ${pokemon.description}`;
          pokemonList.appendChild(listItem);
        });
      } else {
        console.error('Error al obtener la lista de pokémones:', response.statusText);
      }
    } catch (err) {
      console.error('Error en la comunicación con el servidor:', err);
    }
  };

  // Escuchar el evento submit del formulario
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch('/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
      });

      if (response.ok) {
        const newPokemon = await response.json();
        console.log('Nuevo pokémon agregado:', newPokemon);
        form.reset(); // Limpiar el formulario después de agregar el pokémon
        // Obtener y mostrar la lista actualizada de pokémones
        fetchPokemonList();
      } else {
        console.error('Error al agregar el pokémon:', response.statusText);
      }
    } catch (err) {
      console.error('Error en la comunicación con el servidor:', err);
    }
  });

  // Obtener y mostrar la lista inicial de pokémones al cargar la página
  fetchPokemonList();
});

