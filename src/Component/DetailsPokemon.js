import React,{useState,useEffect} from 'react'
import "../Style/DetailsPokemon.scss"
import "../Style/abstracts/pokemon-color.scss"
import typeBarImg from './minicomp/typeBarImg'
import pokeballColor from "../Images/pokeball-color.png"

import GetData from '../Function/GetData'
import useFetch from '../Function/useFetch'
import useFetchTwo from '../Function/useFetchTwo'
import arrowBtn from "../Images/arrow-btn.svg"

import AboutTab from './tabComponent/AboutTab'
import StatsTab from './tabComponent/StatsTab'
import Evotab from './tabComponent/Evotab'
import MoveTab from './tabComponent/MoveTab'
import MoveDetailsTab from './tabComponent/MoveDetailsTab'
import ZoomImage from './tabComponent/ZoomImage'


function DetailsPokemon({setMain,pokemon,setPokemon,history,species,setSpecies,setVersus,versus}) {
  const {data,error,loading} = useFetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  const {data2,error2,loading2} = useFetchTwo(species)
  let speciesDetails  =  [];
  if(data2){
    speciesDetails = data2.data
  }
  //console.log(speciesDetails)
  const [color,setColor] = useState(undefined)
  //console.log(speciesDetails)
  const [image,setImage] = useState(0)
  const [selected,setSelected] = useState(1)
  const [load,setLoad] = useState(false)
  const [selectedMove,setMove] = useState(null)
  const [zoom,setZoom] = useState(false)
  
  const closeDetails = () =>{
    if(versus){
      setPokemon(null)
      setSpecies(null);
    }else{
      setPokemon(null);
    setMain(history);
    setSpecies(null);
    }
    
  }

  /*----------- selector ------------*/
  
  function indicator(e){
    const marker = document.querySelector("#marker")
    if(marker){
      marker.style.width = (e.offsetWidth+ 5 )+ "px";
      marker.style.left = (e.offsetLeft - 5) + "px";
    }
  }
  /*----------- selector ------------*/

  const selectingBar = (e,n)=>{
    if(n === 3 && speciesDetails.evolution_chain === null){
      alert("Evolution not Available")
    }else{
      indicator(e);
      setSelected(n);
    }
  }
  const fixingText = (str) =>{
    str = str.replace(/-/g, " ");
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if(data && data2) return (
    <div className={`details-pokemon-cont `} id='detailsPokemon'>
      <span className={`bg ${color === undefined ? speciesDetails && speciesDetails.color.name : color}`}></span>
        <img className='back-btn' src={arrowBtn} alt="" onClick={()=>closeDetails()}/>
        <div className='details-card'>
            <div className='header-icon'>
                <span className={image === 0 && "selected-img"} onClick={()=>setImage(0)}>2D</span>
                <span className={image === 1 && "selected-img"} onClick={()=> {setImage(1);setLoad(false)}}>3D</span>
            </div>
            <div className='details-info' >
                <div className='pokeball-color' style={load ? {} : {display:"block"}}>
                  <img src={pokeballColor} className={`${data.data.sprites.other.home.front_default === null && image === 1 ? "pokeball-stop": "pokeball-spin"}`} alt="" />
                </div>
                {image === 0  && <img onLoad={()=>setLoad(true)} className='pokemon-image D2' src={data.data.sprites.other["official-artwork"].front_default} alt="" style={load ? {} : {display:"none"}} onClick={()=>setZoom(true)} />}
                {image === 1  && <img onLoad={()=>setLoad(true)} className={`pokemon-image`} src={data.data.sprites.other.home.front_default} alt="" style={load ? {} : {display:"none"}} onClick={()=>setZoom(true)} />}
                <h2>#{data.data.id}</h2>
                <h1>{fixingText(data.data.name)}</h1>
                <div className='details-type'>
                  {data.data.types.map((i,n)=>{
                    return <img src={typeBarImg[i.type.name]} alt="" key={n} />
                  })}
                </div>
            </div>

            <div className='section-selector'>
              <div className='selector'>
                <p onClick={(e)=>selectingBar(e.target,1)} className={`${selected === 1 && "active-text"}`} >About</p>
                <p onClick={(e)=>selectingBar(e.target,2)} className={`${selected === 2 && "active-text"}`} >Base Stats</p>
                <p onClick={(e)=>selectingBar(e.target,3)} className={`${selected === 3 && "active-text"}`} >Evolution</p>
                <p onClick={(e)=>selectingBar(e.target,4)} className={`${selected === 4 && "active-text"}`} >Move</p>
              </div>
              <span className='grey-bar'></span>
              <span className={`active-bar ${speciesDetails && speciesDetails.color.name+"-1"}`} id="marker"></span>
            </div>
            <div className='tabselected-cont'>
            {speciesDetails && selected === 1 && <AboutTab pokemonData={data.data} pokemonSpecies={speciesDetails} />}
            {speciesDetails && selected === 2 && <StatsTab pokemonData={data.data} />}
            {speciesDetails && selected === 3 && <Evotab pokemonData={data.data} pokemonSpecies={speciesDetails} fixingText={fixingText} pokemon={pokemon} setPokemon={setPokemon} setLoad={setLoad} setSpecies={setSpecies}/>}
            {speciesDetails && selected === 4 && <MoveTab pokemonData={data.data} pokemonSpecies={speciesDetails} fixingText={fixingText} setMove={setMove} />}
            </div>
        </div> 
        {selectedMove && <MoveDetailsTab fixingText={fixingText} setMove={setMove} selectedMove={selectedMove} color={speciesDetails.color.name} />}
        <ZoomImage pokemonData={data.data} fixingText={fixingText} image={image} setImage={setImage} setZoom={setZoom} zoom={zoom}  />
        
    </div>
  )
}

export default DetailsPokemon