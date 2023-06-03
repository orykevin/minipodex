import React, { useEffect } from 'react'
import typeIcoImg from "../minicomp/typeIcoImg"
import dmgClass from "../../Images/damage-class/Physicall.png"
import "../../Style/TabSection.scss"
import GetData from '../../Function/GetData'
import tableResult from './tableResult'
import '../../Style/abstracts/pokemon-color.scss'

function MoveTab({pokemonData,fixingText,pokemonSpecies,setMove}) {
  //console.log(pokemonData)
  return (
    <div className='move-tab-cont'>
        <div>
          <table>
            <tbody>
            <tr className={`table-header ${pokemonSpecies.color.name+"-1"}`}>
              <th className='lv-head'>Lv</th>
              <th className='move-head'>Move</th>
              <th className='type-head'>Type</th>
              <th className='class-head'>Class</th>
            </tr>
            {pokemonData.moves.sort((a,b) =>{
              return a.version_group_details[a.version_group_details.length-1].level_learned_at - b.version_group_details[b.version_group_details.length-1].level_learned_at
            }).map((i,n)=>{
              if(i.version_group_details[i.version_group_details.length-1].level_learned_at > 0 ){
                return tableResult(i.move.url,i.version_group_details[i.version_group_details.length-1].level_learned_at,pokemonSpecies.color.name,setMove,n)
              }
            })}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default MoveTab