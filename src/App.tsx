import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PokemonList from './List/PokemonList';
import PokeHeader from './components/PokeHeader';
import PokemonDetail from './detail/PokemonDetail';
import { store } from './Store';
import { Provider } from "react-redux"
const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <PokeHeader/>
      <Routes>
        <Route path='/' element={<PokemonList/>} />
        <Route path='/pokemon/:name' element={<PokemonDetail/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>

  );
};

export default App;