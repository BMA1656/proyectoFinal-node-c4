 async function getPokemons() {
  const response = await fetch('/pokemons');
  const pokemons = await response.json();
  return pokemons;
}

async function renderPokemons() {
  const pokemonListElement = document.getElementById('pokemonList');
  const pokemons = await getPokemons();
  pokemons.forEach(pokemon => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.innerHTML = `
      <h3>${pokemon.name}</h3>
      <p>Type: ${pokemon.type}</p>
      <p>Description: ${pokemon.description}</p>
      <p>Has Evolution: ${pokemon.hasEvolution ? 'Yes' : 'No'}</p>
      <p>Weaknesses: ${pokemon.weaknesses.join(', ')}</p>
      <hr>
    `;
    pokemonListElement.appendChild(pokemonDiv);
  });
}

renderPokemons();