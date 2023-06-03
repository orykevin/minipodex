import React,{useState} from 'react'
import Pokeball from "../Images/pokeball.svg"
import versusIco from "../Images/battle-ico.png"
import pokeIco from "../Images/pokeball-color.png"
import "../Style/FrontPage.scss"
import GenerationCard from './minicomp/GenerationCard'
import SearchResult from './minicomp/SearchResult'
import arrowBtn from "../Images/arrow-btn.svg"
import typeBarImg from './minicomp/typeBarImg'
import useFetch from '../Function/useFetch'
import debounce from 'lodash.debounce'
import generationArr from "../Component/data/GenerationInfo"

function FrontPage({setAllurl,setMain,setPokemon,openDetails,setVersus,setGuess}) {
  const [inputStr,setInput] = useState("")
  const {data,error,loading} = useFetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
  const [animation,setAnimation] = useState(0);
  //if(data) console.log(data.data.results)
  let filteredArray = []
  const filteredPokemon = ()=>{
      filteredArray = data.data.results.filter((i)=>{
        if(i.name.includes(inputStr.toLowerCase())) return true
      })
  } 
  if (data) filteredPokemon()
  //console.log(filteredArray)
  const [expand,setExpand] = useState({
    gen:false,
    type:false,
  })
  const filteredResult = () =>{
    return filteredArray.map((i,n)=>{
      if(n<7){
        return <SearchResult url={i.url} key={n} openDetails={openDetails}/>
      }
    })
  }
  const updateSearch = (e)=>{
    let timeout;
    timeout  = setTimeout(()=>setInput(e.target.value),500) 
    if(e.target.value === ""){
      setInput("")
      clearTimeout(timeout)
    }
  }
  const debounceSearch = debounce(updateSearch,200)
  const setUrlGen = (gen) =>{
    setAllurl(`https://pokeapi.co/api/v2/generation/${gen}`)
    setMain(2)
  }
  const setUrlType = (type) =>{
    setAllurl(`https://pokeapi.co/api/v2/type/${type}`)
    setMain(2)
  }
  const versusHandle = (type) =>{
    if(type === 1){
      setAnimation(1)
    setTimeout(()=>{
      setAnimation(0)
      setVersus(true)
    },700)
    }else{
      setAnimation(2)
    setTimeout(()=>{
      setAnimation(0)
      setGuess(true)
    },700)
    }
    
  }
  return (
    <div className='front-page-cont'>
        <h1>MiniPo<span style={{color:"#EE5454"}}>Dex</span></h1>
        <div className='search-box'>
            <input type="text" onChange={debounceSearch} />
            <img src={Pokeball} alt="" />
        </div>
        <div className='play-container'>
        <div className='header-versus'>
            <h4>Versus to compare pokemon </h4>
            <div className='battle-ico-btn' onClick={()=>versusHandle(1)}>
              <span className={animation === 1 &&'versus-box'}></span>
              <img className={animation === 1 &&'versus-img'} src={versusIco} alt="" />
              <h3 className={animation === 1 &&'versus-text'}>VERSUS</h3>
            </div>
        </div>
        <div className='header-versus'>
            <h4>Guess who's That Pokémon !</h4>
            <div className='battle-ico-btn' onClick={()=>versusHandle(2)}>
              <span className={animation === 2 &&'versus-box'}></span>
              <img className={`pokeball-ico ${animation === 2 &&'versus-img'}`} src={pokeIco} alt="" />
              <h3 className={animation === 2 &&'versus-text'}> GUESS !</h3>
            </div>
        </div>
        </div>
        <div className='wrapper'>
        <div className='gen-section'>
          <div className='gen-header'>
            <h4>All Pokemon by generation </h4>
            <img src={arrowBtn} alt="" className={`${expand.gen ? "expander" : "expanded"} `} onClick={()=>setExpand({...expand,gen:!expand.gen})}/>
          </div>
          <div className='gen-cont'>
            {generationArr.map((i,n)=>{
              if(!expand.gen){
                if(n<4){
                  return  <GenerationCard gen={i.gen} img={i.img} n={n} setUrlGen={setUrlGen}  /> 
                }
              }else{
                  return <GenerationCard gen={i.gen} img={i.img} n={n} setUrlGen={setUrlGen}  /> 
              }
            })}
          </div>
        </div>
        <div className='type-section'>
          <div className='type-header'>
            <h4>All Pokemon by type </h4>       
            <img src={arrowBtn} alt="" className={`${expand.type ? "expander" : "expanded"} `} onClick={()=>setExpand({...expand,type:!expand.type})}/>
          </div>
          <div className='type-cont'>
            <img onClick={()=>setUrlType(7)} src={typeBarImg.bug} alt="" />
            <img onClick={()=>setUrlType(17)} src={typeBarImg.dark} alt="" />
            <img onClick={()=>setUrlType(16)} src={typeBarImg.dragon} alt="" />
            <img onClick={()=>setUrlType(13)} src={typeBarImg.electric} alt="" />
            <img onClick={()=>setUrlType(18)} src={typeBarImg.fairy} alt="" />
            <img onClick={()=>setUrlType(2)} src={typeBarImg.fighting} alt="" />
            <img onClick={()=>setUrlType(10)} src={typeBarImg.fire} alt="" />
            <img onClick={()=>setUrlType(3)} src={typeBarImg.flying} alt="" />
          </div>
          <div className={`type-cont ${!expand.type && "hide"}`}>
            <img onClick={()=>setUrlType(8)} src={typeBarImg.ghost} alt="" />
            <img onClick={()=>setUrlType(12)} src={typeBarImg.grass} alt="" />
            <img onClick={()=>setUrlType(5)} src={typeBarImg.ground} alt="" />
            <img onClick={()=>setUrlType(15)} src={typeBarImg.ice} alt="" />
            <img onClick={()=>setUrlType(1)} src={typeBarImg.normal} alt="" />
            <img onClick={()=>setUrlType(4)} src={typeBarImg.poison} alt="" />
            <img onClick={()=>setUrlType(14)} src={typeBarImg.psychic} alt="" />
            <img onClick={()=>setUrlType(6)} src={typeBarImg.rock} alt="" />
            <img onClick={()=>setUrlType(9)} src={typeBarImg.steel} alt="" />
            <img onClick={()=>setUrlType(11)} src={typeBarImg.water} alt="" />
          </div>
        </div>
        </div>
        <div className={`search-cont ${inputStr === "" && "hide"}`}>
            <div className='search-result'>
              {filteredResult()}
            </div>
        </div>
    </div>
  )
}

export default FrontPage