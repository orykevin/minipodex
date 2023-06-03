import React from 'react'
import "../Style/Allpokemon.scss"
import GroupCard from './minicomp/GroupCard'
import arrowBtn from "../Images/arrow-btn.svg"
import useFetch from '../Function/useFetch'

function AllPokemonPage({allUrl,setMain,setAllUrl,pokemon,openDetails}) {
  const {data,error,lodaing} = useFetch(allUrl)
  //if(data) console.log(data.data)
  const fixGenName = (str) =>{
    return (str.slice(0,10)+ " " + str.slice(11).toUpperCase())
  }
  const changeUrl = (str)=>{
    return str.slice(42,str.length-1)
  }
  const getUrl = (n) =>{
    if(data) 
      if(data.data.hasOwnProperty("main_region")){
        return (` https://pokeapi.co/api/v2/pokemon/${changeUrl(data.data.pokemon_species[n].url)}`)
      }else {
        return (data.data.pokemon[n].pokemon.url)
      }
  }
  const printPokemonCard = () => {
    if(data) return data.data[data.data.hasOwnProperty("main_region") ? "pokemon_species" : "pokemon"].map((i,n)=>{
      return <GroupCard  url={getUrl(n)} openDetails={openDetails} />
    })
  }

  if(data) return (
    <div className={`allpoke-page-cont`}>
        {!pokemon && <img className='back-btn' src={arrowBtn} alt="" onClick={()=>setMain(1)} />}
        {data.data.hasOwnProperty("main_region") && <div>
        <h4>{"All Pokemon from " + fixGenName(data.data.name) }</h4>
        <p>{ data.data.main_region.name.charAt(0).toUpperCase()+ data.data.main_region.name.slice(1) + " Region"}</p>
        </div> }
        {!data.data.hasOwnProperty("main_region") && <div>
        <h4>{"All Pokemon with " + data.data.name + " type"}</h4>
        </div> }

        <div className='result-all-cont'>
          {printPokemonCard()} 
        </div>
    </div>
  )
}

export default AllPokemonPage