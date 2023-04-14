import React from 'react';
import {Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';

const App = () => {
  return (
    <Routes>   
        <Route exact path="/" element={<PokemonList/>} />
        <Route exact path="/pokemon/:id" element={<PokemonDetails/>} />
    </Routes>
  );
}

export default App;
