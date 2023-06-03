import React,{useState} from 'react'
import "../Style/GuessPage.scss"
import GenerationInfo from "./data/GenerationInfo"
import GenerationCard from './minicomp/GenerationCard'
import GuessLobby from './minicomp/GuessLobby'
import useFetch from '../Function/useFetch'
import GenSearchData from './data/GenSearchData'
import backBtn from "../Images/arrow-btn.svg"



function GuessPokemon({setGuess}) {
  const [gen,setGen] = useState(0)
  const {data,error,loading} = useFetch(`https://pokeapi.co/api/v2/pokemon?limit=${gen > 0 ? GenSearchData[gen-1].limit : 1}&offset=${gen > 0 ? GenSearchData[gen-1].offset : 1}`)
  if(data) console.log(data.data.results)
    return (
    <div className='guess-page-cont'>
      <img src={backBtn} className="back-btn" alt="" onClick={()=>setGuess(false)} />
        <h1>Who's That Pokémon</h1>
        <div className="gens-cont">
          <div className="gen-card">
            {GenerationInfo.map((i,n)=>{
              return <GenerationCard gen={i.gen} img={i.img} n={n} vertical={true} setGen={setGen} />
            })}
          </div>
        </div>
        {gen > 0 && <GuessLobby datas={data.data.results} setGuess={setGuess} />}
    </div>
  )
}

export default GuessPokemon