import React from 'react'
import typeBarImg from './typeBarImg'
import exit from "../../Images/exit.svg"
import arrowBtn from "../../Images/arrow-btn.svg"
import "../../Style/VersusPage.scss"
import StatsTab from '../tabComponent/StatsTab'

function VersusInfo({pokemonData,setPoke,outBattle,keys,isOut,setPokemon,setSpecies}) {
  //console.log(pokemonData)
  const fixingText = (str) =>{
    str = str.replace(/-/g, " ");
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div className={`versus-info-cont ${isOut && "closed-info"}`}>
        <img className='ext-btn' src={exit} alt="" onClick={()=>outBattle(keys)} />
        <img className='open-btn' src={arrowBtn} alt="" onClick={()=>{setPokemon(pokemonData.id);setSpecies(pokemonData.species.url)}} />
       {!isOut && <div className='name-info'>
            <h2>#{pokemonData.id}</h2>
            <h1>{fixingText(pokemonData.name)}</h1>
            <div className='type-icon-cont'>
              {pokemonData.types.map((i,n)=>{
                    return <img src={typeBarImg[i.type.name]} alt="" key={n} />
                  })}
            </div>
            <StatsTab pokemonData={pokemonData} versus={true}/>
        </div>}
    </div>
  )
}

export default VersusInfo