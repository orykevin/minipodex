import React,{useState} from 'react'
import "../../Style/VersusPage.scss"
import Pokeball from "../../Images/pokeball.svg"
import SearchResult from './SearchResult'
import useFetch from '../../Function/useFetch'
import debounce from 'lodash.debounce'

function VersusSearch({datas,setPoke,keys,guess,setPicked}) {
  const [input,setInput] = useState("")
  const filteredData = datas.filter((d)=>{
      if(d.name.includes(input.toLowerCase())) return true;
  })
  const updateSearch = (e)=>{
    let timeout;
    timeout  = setTimeout(()=>setInput(e.target.value),1500) 
    if(e.target.value === ""){
      setInput("")
      clearTimeout(timeout)
    }
  }
  const printResult = () =>{
    return filteredData.map((d,i)=>{
      if(i < (guess ? 3 : 6)){
        return <SearchResult url={d.url} mini={guess ? false :true} setPoke={setPoke} guess={guess} setPicked={setPicked} setInput={setInput} />
      }
    })
  }
  const debounceSearch = debounce(updateSearch,300)
  //console.log(datas)
  //console.log(filteredData)
  return (
    <div className='search-cont-versus'>
        <div className='search-box'>
            <input type="text" onChange={debounceSearch} style={guess && {padding:"5px 10px"}}/>
            <img src={Pokeball} alt="" style={guess && {top:"10px"}} />
        </div>
        <div className={`search-result ${input === "" && "hide no-height"}`}>
            {printResult()}
        </div>
    </div>
  )
}

export default VersusSearch