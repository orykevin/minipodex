import React,{useState,useEffect} from 'react'
import "../../Style/GuessPage.scss"
import backBtn from "../../Images/arrow-btn.svg"
import lightblue from "../../Images/lightbulb-blue.svg"
import useFetch from '../../Function/useFetch'
import typeBarImg from "./typeBarImg"

function GuessHint({setHint,url,pData,submited}) {    
  const {data,error,loading} = useFetch(url)
  const regEx1 = /\f/g;

  //if(data) console.log(data.data)

  const printLetter = () =>{
    const newArr = pData.name.toUpperCase().split("")
    return newArr.map((e,i)=>{
      if(i === newArr.length-1){
        return <div className="letter-hint">{e}</div>
      }
      if(i === newArr.length-2 && submited >= 1){
        return <div className="letter-hint">{e}</div>
      }
      if(i === 0 && submited >= 2){
        return <div className="letter-hint">{e}</div>
      }
      return <div className="letter-hint">{""}</div>
    })
  }
  const filteredFlavor = () =>{
    if(data){
      const filteredEntries = data.data.flavor_text_entries.filter(e => e.language.name === "en")
      console.log(filteredEntries)
      return filteredEntries?.[0]?.flavor_text.replace(regEx1, " ") ;
    }
    
  }
  console.log(filteredFlavor())
  return (
    <div className='guess-hint-cont'>
      <img src={backBtn} className="back-btn back-hint" alt="" onClick={()=>{setHint(false)}} />
        <h1>HINT</h1>
      <img src={lightblue} alt="" className='hint-btn' onClick={()=>{setHint(false)}}  />
      <h2>Your Chance : {3-submited}</h2>
      <div className='letter-hint-cont'>
        {printLetter()}

      </div>
      <div className='info-hint-cont'>
      <div className='first-hint'>
          <h3>{submited >=1 ?  "Pokemon Descriptons" : "Try 1 more to Open"}</h3>
          {submited >=1 && <p>{filteredFlavor()}</p>}
        </div>
        <div className='second-hint'>
          <h3>{submited >=2  ? "Pokemon Types" : `Try ${2-submited} more to Open`}</h3>
          {submited >=2 && <div className="guess-type">
          {pData.types.map((e)=>{
            return <img src={typeBarImg[e.type.name]}></img>
          })}
          </div>}
        </div>
      </div>
    </div>
  )
}

export default GuessHint