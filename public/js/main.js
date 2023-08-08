async function getPokemons() {
  const response = await fetch('/pokemons');
  const pokemons = await response.json();
  return pokemons;
}

document.addEventListener('DOMContentLoaded', async () => {
  const showAllPokemons = document.getElementById("pokeListbt");
  const formEvent = document.getElementById('pokemonForm');
  const pokemonList = document.getElementById('pokemonList');

  const fetchPokemonList = async () => {
    pokemonList.innerHTML = "";

    try {
      const pokemons = await getPokemons();
      pokemons.forEach(pokemon => {
        let evolucion = pokemon.tieneEvolucion ? "si" : "no";
        pokemonList.innerHTML +=
          `
          <li class="pokerCard" id="${pokemon._id}">
          <p> Nombre : ${pokemon.nombre}</p>
          <p> Tipo : ${pokemon.tipo}</p>
          <p> Descripción : ${pokemon.descripción}</p>
          <p> Posee Evolucion : ${evolucion}</p>
          <p> Debilidades : ${pokemon.debilidades.join(', ')}</p>
          </li>
          `;
      });
    } catch (err) {
      console.error('Error al obtener la lista de pokémones:', err);
    }
  };

  showAllPokemons.addEventListener('click', fetchPokemonList);

  formEvent.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formEvent);
    const formDataObject = {
      nombre: formData.get('name'),
      tipo: formData.get('type'),
      descripcion: formData.get('description'),
      tieneEvolucion: formData.get('hasEvolution') === 'on',
      debilidades: formData.get('weaknesses').split(','),
    };
    

    console.log(formDataObject); 

    try {
      const response = await fetch('/pokemons', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      if (response.ok) {

        
        const newPokemon = await response.json();
        console.log('Nuevo Pokémon agregado:', newPokemon);
        fetchPokemonList(); // Actualiza la lista de Pokémones
      } else {
        console.error('Error al agregar el Pokémon:', response.statusText);
      }
    } catch (err) {
      console.error('Error en la comunicación con el servidor:', err);
    }
  });

  fetchPokemonList();
});