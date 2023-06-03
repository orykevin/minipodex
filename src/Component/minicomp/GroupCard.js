import React from 'react'
import typeIcoImg from "./typeIcoImg"
import "../../Style/Allpokemon.scss"
import useFetch from '../../Function/useFetch'
import greatball from "../../Images/greatball.png"

function GroupCard({url,openDetails}) {
  const {data,error,loading} = useFetch(url)
  //if(data) console.log(data.data)
  if(data) return (
    <div className='group-card-cont' onClick={()=>{openDetails(data.data.id,data.data.species.url)}}>
        <div className='image-cont'>
            <img src={data.data.sprites.versions["generation-viii"].icons.front_default !== null ? data.data.sprites.versions["generation-viii"].icons.front_default : greatball} alt={data.data.name} />
        </div>
        <h5>#{data.data.id}</h5>
        <div className='type-ico-cont'>
            {data.data.types.map((i,n)=>{
              return <img src={typeIcoImg[i.type.name]} alt={i.type.name} />
            })}
        </div>
        <h3>{data.data.species.name.charAt(0).toUpperCase() + data.data.species.name.slice(1)}</h3>
    </div>
  )
}

export default GroupCard