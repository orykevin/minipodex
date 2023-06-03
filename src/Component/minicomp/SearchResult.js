import React,{useState,useEffect} from 'react'
import useFetch from '../../Function/useFetch'
import "../../Style/FrontPage.scss"
import "../../Style/abstracts/colors.scss"
import greatball from "../../Images/greatball.png"
import pokeBall from "../../Images/pokeball-color.png"
import typeIcoImg from './typeIcoImg'
import { useMemo } from 'react'

function SearchResult({url,openDetails,mini,keys,setPoke,guess,setPicked,setInput}) {
  const {data,result,loading} = useFetch(url)
  const [loaded,setLoaded] = useState(false)

  const changeUrl2 = (str)=>{
    return str.slice(34,str.length-1)
    }
  const typeCheck = () =>{
    if(data){
        return data.data.types.map((i,n)=>{
            if(mini){
              return <img src={typeIcoImg[i.type.name]} />
            }else{
              return(
                <div className={`type-bar-cont  ${i.type.name}`} key={n}>
                  <span>{(i.type.name).toUpperCase()}</span>
                </div>
            )
            }
            
        })
    }
  }
  const fixingText = (str) =>{
    str = str.replace(/-/g, " ");
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  useEffect(()=>{
    setLoaded(false)
  },[url])

  const clickHandle = ()=>{
    if(mini){
      setPoke(data.data)
    }else if(guess){
      setPicked(data.data)
      setInput("")
    }else{
      openDetails(data.data.id,data.data.species.url)
    }
  }

  //if(data) console.log(data.data)
  if (data) return (
    <div className={`result-cont ${mini && "mini-ver-cont"}`} onClick={()=>clickHandle()}>
      {!guess && <div className={`pokeballs-color ${mini && "mini-pokeball"}`} style={loaded ? {} : {display:"block"}} >
        <img className='pokeballs-spin' src={pokeBall} alt="" />
      </div>}
        {!guess && <img className={`result-ico ${mini && "mini-ico"}`} onLoad={()=>setLoaded(true)} src={data.data.sprites.versions["generation-viii"].icons.front_default !== null ? data.data.sprites.versions["generation-viii"].icons.front_default : greatball  } alt={data.data.name} style={loaded ? {display:"block"} : {}}  />}
        <div className={`p-cont ${guess && "guess-p-cont"}`}>
        <p>{fixingText(data.data.name)}</p>
        </div>
        <div className={`bar-cont ${guess && "guess-bar-cont"}`}>
        {typeCheck()}
        </div>
        <div className='line-cont'></div>
    </div>
  )
}

export default SearchResult