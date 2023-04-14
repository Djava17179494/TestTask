import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import './PokemonDetails.css';

const PokemonDetails = () => {
  const pokemonName  = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("pokemonName",pokemonName.id);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.id}`);
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemon();
  }, [pokemonName.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-details">
      <h2>{pokemon.name}</h2>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
      <p>
        <strong>Type:</strong>{" "}
        {pokemon.types.map((type) => (
          <span key={type.type.name} className={`type type-${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </p>
      <p>
        <strong>Abilities:</strong>{" "}
        {pokemon.abilities.map((ability) => (
          <span key={ability.ability.name} className="ability">
            {ability.ability.name}
          </span>
        ))}
      </p>
      <p>
        <strong>Stats:</strong>{" "}
        {pokemon.stats.map((stat) => (
          <span key={stat.stat.name} className="stat">
            {stat.stat.name}: {stat.base_stat}
          </span>
        ))}
      </p>
      <Link to="/">Back to Pokemon List</Link>
    </div>
  );
};

export default PokemonDetails;