import React from 'react'
import useFetch from '../../Function/useFetch'
import typeIcoImg from '../minicomp/typeIcoImg'
import "../../Style/abstracts/pokemon-color.scss"

function EvoCard({fixingText,url,lvl,color,pokemon,setPokemon,setLoad,setSpecies}) {
    const {data,error,loading} = useFetch(`https://pokeapi.co/api/v2/pokemon/${url}`)
    //if(data) console.log(data)
    
  if(data)return (
    <div className={`evo-card-cont ${parseInt(url) === pokemon && color}`} onClick={()=>{setPokemon(parseInt(url));setLoad(false);setSpecies(data.data.species.url)}}>
        <img src={data.data.sprites.front_default ? data.data.sprites.front_default : data.data.sprites.other["official-artwork"].front_default} alt=""  className='evo-image'/>
        <div className='evo-name-cont'>
            <h3>{fixingText(data.data.name)}</h3>
            <p>Lv. {lvl ? lvl : "1"}</p>
        </div>
        <div className='evo-type-cont'>
                {data.data.types.map((i,n)=>{
                    return <img src={typeIcoImg[i.type.name]} alt="" key={n} />
                  })}
        </div>
    </div>
  )
}

export default EvoCard