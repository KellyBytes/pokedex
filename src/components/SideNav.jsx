import { useState } from 'react';
import { first151Pokemon, getFullPokedexNumber } from '../utils';

const SideNav = (props) => {
  const { selectedPokemon, setSelectedPokemon, handleCloseMenu, showSideMenu } =
    props;

  const [searchValue, setSearchValue] = useState('');

  const filteredPokemon = first151Pokemon.filter((el, elIndex) => {
    // if full pokedex number includes the current search value, return true
    if (getFullPokedexNumber(elIndex).includes(searchValue)) return true;

    // if the pokemon name includes the current search value, return true
    if (el.toLowerCase().includes(searchValue.toLowerCase())) return true;

    // otherwise, exclude value from the array
    return false;
  });

  return (
    <nav className={'' + (showSideMenu ? 'open' : '')}>
      <div className={'header ' + (showSideMenu ? 'open' : '')}>
        <button className="open-nav-button" onClick={handleCloseMenu}>
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <h1 className="text-gradient">Pokédex</h1>
      </div>
      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder="E.g. 001 or Bulba..."
      />
      {filteredPokemon.map((pokemon) => {
        const pokedexNumber = first151Pokemon.indexOf(pokemon);

        return (
          <button
            key={pokedexNumber}
            className={
              'nav-card ' +
              (pokedexNumber === selectedPokemon ? 'nav-card-selected' : '')
            }
            onClick={() => {
              setSelectedPokemon(pokedexNumber);
              handleCloseMenu();
            }}
          >
            <p>{getFullPokedexNumber(pokedexNumber)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
};

export default SideNav;
