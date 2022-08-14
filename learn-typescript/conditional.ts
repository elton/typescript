import fetch from 'node-fetch';

interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

type fetchURLReturn<T> = T extends undefined ? Promise<PokemonResults> : void;

function fetchPokemon<T extends ((data: PokemonResults) => void) | undefined>(
  url: string,
  callback?: T
): fetchURLReturn<T> {
  if (callback) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => callback(data as PokemonResults));
    return undefined as fetchURLReturn<T>;
  }

  return fetch(url).then((res) => res.json()) as fetchURLReturn<T>;
}

// callback
fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=10', (data) => {
  data.results.forEach(({ name }) => console.log(name));
});

(async function () {
  const data = <PokemonResults>(
    await fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=10')
  );
  data.results.forEach(({ name }) => console.log(name));
})();
