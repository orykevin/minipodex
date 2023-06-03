import React,{useState} from 'react'
import "../Style/VersusPage.scss"
import battleField from "../Images/battle-field.jpg"
import VersusSearch from './minicomp/VersusSearch'
import VersusInfo from './minicomp/VersusInfo'
import useFetch from '../Function/useFetch'
import pokeBall from "../Images/pokeball1.png"
import backBtn from "../Images/arrow-btn.svg"

function VersusPage({setPokemon,setSpecies,setVersus,setMain}) {
    const {data,error,loading} = useFetch("https://pokeapi.co/api/v2/pokemon?limit=898&offset=0");
    //if(data) console.log(data)
    const [poke1,setPoke1] = useState(null);
    const [poke2,setPoke2] = useState(null);
    const [isOut1,setOut1] = useState(false);
    const [isOut2,setOut2] = useState(false);
    const setBack = (height)=>{
        if(height > 100){
            return "5px"
        }else if(height > 75){
            return "0px"
        }else if(height >= 15 ){
            return "-10px"
        }else if(height >= 13 ){
            return "-15px"
        }else if(height >= 10 ){
            return "-24px"
        }else if(height > 2){
            return "-30px"
        }
    }
    const setFront = (height)=>{
        if(height > 100){
            return "0px"
        }else if(height >= 21 ){
            return "8px"
        }else if(height >= 15 ){
            return "9px"
        }else if(height >= 13 ){
            return "15px"
        }else if(height >= 11 ){
            return "20px"
        }else if(height >= 8 ){
            return "18px"
        }else if(height > 2){
            return "25px"
        }
    }
    const outBattle = (n) =>{
        if(n === 1){
            setOut1(true)
            setTimeout(()=>{
                setPoke1(null)
                setOut1(false);
            },900)
        }else{
            setOut2(true)
            setTimeout(()=>{
                setPoke2(null)
                setOut2(false);
            },900)
        }
    }

  if(data) return (
    <div className='versus-page-cont'>
        <h1 className='versus-header'>Pokemon Versus</h1>
        <img src={backBtn} className="back-btn" alt="" onClick={()=>setVersus(false)} />
        <div className='battlefield-cont'>
            <img className='battlefield' src={battleField} alt="" />
            <img style={{bottom:setBack(poke1 ? poke1.height : 1)}} className={`pokemon-1 ${poke1 && "summon-back"} ${isOut1 && "out-back"} `} src={poke1 ? poke1.sprites.back_default : ""} alt="" />
            <img style={{top:setFront(poke2 ? poke2.height : 1)}} className={`pokemon-2 ${poke2 && "summon-front"} ${isOut2 && "out-front"}  `} src={poke2 ? poke2.sprites.front_default : ""} alt="" />
            {poke1 && <img className={`pokeball1 ball1-in`} src={pokeBall} alt="" />}
            {poke2 && <img className={`pokeball2 ball2-in`} src={pokeBall} alt="" />}
            {isOut1 && <img className={`pokeball1 ball1-out`} src={pokeBall} alt="" />}
            {isOut2 && <img className={`pokeball2 ball2-out`} src={pokeBall} alt="" />}
        </div>
        <div className='pokemon-selected'>
            {poke1 === null ? <div className='search-poke'>
                <h1>Pokemon 1</h1>
                <VersusSearch datas={data.data.results} setPoke={setPoke1} keys={1} />
            </div> : <VersusInfo pokemonData={poke1} setPoke={setPoke1} outBattle={outBattle} keys={1} isOut={isOut1} setPokemon={setPokemon} setSpecies={setSpecies} />}
            {poke2 === null ? <div className='search-poke'>
                <h1>Pokemon 2</h1>
                <VersusSearch datas={data.data.results} setPoke={setPoke2} keys={2} />
            </div> : <VersusInfo pokemonData={poke2} setPoke={setPoke2} outBattle={outBattle} keys={2} isOut={isOut2} setPokemon={setPokemon} setSpecies={setSpecies} />}
        </div>
        
    </div>
  )
}

export default VersusPage