import React from 'react'
import arrowBtn from "../../Images/arrow-btn.svg"
import typeBarImg from '../minicomp/typeBarImg'
import psyClass from "../../Images/damage-class/Physicall.png"
import spClass from "../../Images/damage-class/Speciall.png"
import statClass from "../../Images/damage-class/Status.png"
import "../../Style/abstracts/pokemon-color.scss"



function MoveDetailsTab({fixingText,setMove,selectedMove,color}) {
    const statusDamage = (stat) =>{
        if(stat === "physical")return psyClass;
        if(stat === "status") return statClass;
        if(stat === "special") return spClass;
    }
    const fixCapital = (str) =>{
        str = str.replace(/-/g, " ");
        return str.toUpperCase()
    }
    const fixingDescrption = (str) =>{
        return str.replace(/\$effect_chance/g,selectedMove.effect_chance)
    }

  return (
    <div className='move-details-cont' >
        <div className='move-details-info'>
        <img src={arrowBtn} alt="" className='close-move' onClick={()=>setMove(null)} />
        <h1>{fixCapital(selectedMove.name)}</h1>
        <div className='bar-cont'>
            <img src={typeBarImg[selectedMove.type.name]} alt="" className='type-bar' />
            <div className={`class-bar ${selectedMove.damage_class.name}`}>
                <p>{fixCapital(selectedMove.damage_class.name)}</p>
                <img src={statusDamage(selectedMove.damage_class.name)} alt="" />
            </div>
        </div>
        <div className='move-status-cont'>
            <div className={`status-box ${color+"-2"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 12 16" >
                <path id="Icon_awesome-fist-raised" data-name="Icon awesome-fist-raised" d="M8,5V.5A.5.5,0,0,0,7.5,0h-1A.5.5,0,0,0,6,.5V5.092A1.486,1.486,0,0,1,6.5,5Zm4,3a2,2,0,0,0-2-2H6.5a.5.5,0,0,0-.5.5v.017A1.487,1.487,0,0,0,7.485,8h1.1c.3,0,.413.112.413.25v.506a.257.257,0,0,1-.246.25c-1.391.071-2.005.772-3,2.267l-.2.3a.25.25,0,0,1-.347.069l-.416-.278a.25.25,0,0,1-.069-.347l.2-.3A8.844,8.844,0,0,1,6.4,8.9,2.011,2.011,0,0,1,5.183,7.827,1.481,1.481,0,0,1,4.5,8h-1a1.489,1.489,0,0,1-1-.39A1.489,1.489,0,0,1,1.5,8H.5A1.477,1.477,0,0,1,0,7.908v2.435a4,4,0,0,0,1.172,2.828L2,14v2h8V14l1.122-1.123A3,3,0,0,0,12,10.757ZM11,5.184V1.5a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5V5h1A2.961,2.961,0,0,1,11,5.184ZM.5,7h1A.5.5,0,0,0,2,6.5v-4A.5.5,0,0,0,1.5,2H.5a.5.5,0,0,0-.5.5v4A.5.5,0,0,0,.5,7Zm3,0h1A.5.5,0,0,0,5,6.5v-5A.5.5,0,0,0,4.5,1h-1a.5.5,0,0,0-.5.5v5A.5.5,0,0,0,3.5,7Z"/>
                </svg>
                <h3>POWER</h3>
                <h2>{selectedMove.power === null ? "-" : selectedMove.power}</h2>
            </div>
            <div className={`status-box ${color+"-2"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18.128" height="17.919" viewBox="0 0 18.128 17.919">
                <g id="Group_79" data-name="Group 79" transform="translate(-76.872 -330.081)">
                    <g id="Icon_feather-crosshair" data-name="Icon feather-crosshair" transform="translate(74.872 328.081)">
                    <path id="Path_10" data-name="Path 10" d="M19.128,10.959A8.065,8.065,0,1,1,11.064,3,8.012,8.012,0,0,1,19.128,10.959Z" transform="translate(0)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path id="Path_11" data-name="Path 11" d="M30.175,18H27" transform="translate(-11.047 -7.041)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path id="Path_12" data-name="Path 12" d="M6.175,18H3" transform="translate(0 -7.041)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path id="Path_13" data-name="Path 13" d="M18,6.175V3" transform="translate(-6.936)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path id="Path_14" data-name="Path 14" d="M18,30.175V27" transform="translate(-6.936 -11.256)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </g>
                    <circle id="Ellipse_9" data-name="Ellipse 9" cx="2" cy="2" r="2" transform="translate(84 337)"/>
                </g>
            </svg>
            <h3>ACCURACY</h3>
            <h2>{selectedMove.accuracy === null ? "-" : selectedMove.accuracy  + "%"}</h2>
            </div>
            <div className={`status-box ${color+"-2"}`}>
                <h1 style={color === "black" ? {color:"black"}:{}} >PP</h1>
                <h3>POWER POINTS</h3>
                <h2>{selectedMove.pp}</h2>
            </div>
        </div>
        <div className={`effect-cont ${color+"-2"}`}>
            <h3 className={color+"-1"}>EFFECT</h3>
            <p>{fixingDescrption(selectedMove.effect_entries[0].short_effect)}</p>
        </div>
        <div className={`effect-cont ${color+"-2"}`}>
            <h3 className={color+"-1"}>EFFECT IN-DEPTH</h3>
            <p>{fixingDescrption(selectedMove.effect_entries[0].effect)}</p>
        </div>
        </div>
    </div>
  )
}

export default MoveDetailsTab