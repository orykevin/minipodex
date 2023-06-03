import React from 'react'
import "../../Style/FrontPage.scss"
import arrowBtn from "../../Images/arrow-btn.svg"

function GenerationCard({gen,img,n,setUrlGen,vertical,setGen}) {
  return (
    <div className={`gen-card-cont ${vertical && "vertical"}`} onClick={()=>{vertical ? setGen(n+1) : setUrlGen(n+1)}}>
        <h5>Generation {gen}</h5>
        <div className='icon-sprites-cont'>
            {img.map((i,n)=>{
                return (
                    <img className={`icon-${n}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${i}.png`} alt="" />
                )
            })}
        </div>
        <img className='arrow-gen' src={arrowBtn} alt="" />
    </div>
  )
}

export default GenerationCard