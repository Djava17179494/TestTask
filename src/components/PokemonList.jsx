import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PokemonList.css';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [types, setTypes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
  const pokeTypes = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel",
  "Fire", "Water","Grass","Electric","Psychic","Ice","Dragon","Dark","Fairy"]

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
      .then((response) => {
        // console.log('response',response);        
        setPokemons(response.data.results);
      })
      .catch((error) => {
        console.log("error",error);
      });
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCheckboxChange = (event) => { 
    const index = types.indexOf(event.target.name);
    if (index === -1) {
      setTypes([...types, event.target.name]);
    } else {
      setTypes(types.filter((type) => type !== event.target.name));
    }
  };

  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.textContent));
  }

  const handlePokemonsPerPageChange = (event) => {
    setPokemonsPerPage(Number(event.target.textContent));
    setCurrentPage(1);
  };

  const filteredPokemons = pokemons
    .filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()))
    .filter((pokemon) => {
      if (types.length === 0) return true;
      
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      return axios
        .get(pokemonUrl)
        .then((response) => {
          const pokemonTypes = response.data.types.map((type) => type.type.name);
          return types.some((type) => pokemonTypes.includes(type));
        })
        .catch((error) => {
          console.log("error",error);
        });
    });
    
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

 let qwerty = async(pokemonUrl) => {
    await axios.get(pokemonUrl).then((response) => {
                console.log("response",response);
                const pokemonTypes = response.data.types.map((type) => type.type.name);
                return pokemonTypes.map((type) => <span key={type} className={`type type-${type}`}>{type}</span>);
              })
              .catch((error) => {
                console.log("error",error);
              })
  }

  const renderPokemons = currentPokemons.map((pokemon) => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
    return (
      <div key={pokemon.name} className="pokemon-card">
        <Link to={`/pokemon/${pokemon.name}`}>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
        </Link>
        <div className="pokemon-info">
          <div className="pokemon-type">
            {()=>qwerty(pokemonUrl)}
          </div>
        </div>
      </div>
    );
  });
 
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPokemons.length / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <div key={number} className={"pagBlock" + (currentPage === number ? " active" : '')} onClick={handlePageChange}>
        {number}
      </div>
    );
  });

  // useEffect(() => {
    
  // },[types])

  return (
    <div className="pokemon-list">
      <div className="pokemon-filters">
        <div className="pokemon-search">
          <input type="text" placeholder="Search Pokemon" value={search} onChange={handleChange} />
          <div className='itemsCountContainer'>
            <div className='itemsCount' onClick={handlePokemonsPerPageChange}>10</div>
            <div className='itemsCount' onClick={handlePokemonsPerPageChange}>20</div>
            <div className='itemsCount' onClick={handlePokemonsPerPageChange}>50</div>
          </div>
        </div>
        <div className="pokemon-types">
          {pokeTypes.map((tip)=>
          <label><input type="checkbox" name={tip.toLowerCase()} onChange={handleCheckboxChange} checked={types.includes(tip.toLowerCase())} />{tip}</label>
          )}
        </div>
      </div>
      <div className="pokemon-cards">{renderPokemons}</div>
      <div className="pagination">{renderPageNumbers}</div>
    </div>
  );
}
export default PokemonList;


