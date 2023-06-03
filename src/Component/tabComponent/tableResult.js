import useFetch from "../../Function/useFetch";
import React from 'react'
import typeIcoImg from "../minicomp/typeIcoImg"
import psyClass from "../../Images/damage-class/Physicall.png"
import spClass from "../../Images/damage-class/Speciall.png"
import statClass from "../../Images/damage-class/Status.png"
import GetData from "../../Function/GetData";
import "../../Style/abstracts/pokemon-color.scss"

function tableResult(url,lvl,color,setMove,key) {
    const data = GetData(url)
    //if(data) console.log(data)
    const fixingText = (str) =>{
        str = str.replace(/-/g, " ");
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    const statusDamage = (stat) =>{
        if(stat === "physical")return psyClass;
        if(stat === "status") return statClass;
        if(stat === "special") return spClass;
    }
  if(data)return (
    <tr className={`move-list ${color+"-3"}`} onClick={()=>setMove(data)} >
        <td>{lvl}</td>
        <td><p>{fixingText(data.name)}</p></td>
        <td className='type-icon'><img src={typeIcoImg[data.type.name]} alt="" /></td>
        <td className='class-icon' > <div className='round-ico'><img src={statusDamage(data.damage_class.name)} alt="" /></div></td>
    </tr>
  )
}

export default tableResult