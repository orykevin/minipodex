import logo from './logo.svg';
import {useState} from 'react'
import "./Style/App.scss";
import barButton from "./Images/bar-btn.svg"
import FrontPage from './Component/FrontPage';
import AllPokemonPage from './Component/AllPokemonPage';
import DetailsPokemon from './Component/DetailsPokemon';
import VersusPage from './Component/VersusPage';
import GuessPokemon from './Component/GuessPokemon';

function App() {
  const [allUrl,setAllurl] = useState(null)
  const [displayMain,setMain] = useState(1)
  const [pokemon,setPokemon] = useState(null)
  const [species,setSpecies] = useState(null)
  const [history,setHistory] = useState(0)
  const [versus,setVersus] = useState(false)
  const [guess,setGuess] = useState(false)
  const openDetails = (i,s) =>{
    setPokemon(i);
    setHistory(displayMain);
    setSpecies(s);
  }
  const lockBody = document.body.style.overflow = pokemon || versus || guess ? "hidden" : "auto"


  return (
    <div className={`App ${pokemon && "fixScreen"}`}>
      <div className='bar-btn'>
        {displayMain === 1 && !versus && !guess && <img src={barButton} alt="" />}
      </div>
      {pokemon && <DetailsPokemon setMain={setMain} pokemon={pokemon} setPokemon={setPokemon} history={history} setSpecies={setSpecies} species={species} setVersus={setVersus} versus={versus} /> }
      {displayMain === 1 && <FrontPage setAllurl={setAllurl} setMain={setMain} setPokemon={setPokemon} openDetails={openDetails} setVersus={setVersus} setGuess={setGuess} />}
      {displayMain === 2 &&<AllPokemonPage setAllurl={setAllurl} setMain={setMain} allUrl={allUrl} setPokemon={setPokemon} openDetails={openDetails} pokemon={pokemon} history={history}  />}
      {versus && <VersusPage setPokemon={setPokemon} setSpecies={setSpecies} versus={versus} setVersus={setVersus} setMain={setMain} />}
      {guess && <GuessPokemon setGuess={setGuess} />}
    </div>
  );
}

export default App;
