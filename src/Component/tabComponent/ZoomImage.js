import React from 'react'
import "../../Style/TabSection.scss"
import pokeball from "../../Images/pokeball.svg"
import arrowBtn from "../../Images/arrow-btn.svg"

function ZoomImage({pokemonData,fixingText,image,zoom,setZoom}) {

  return (
    <div className={`zoom-container ${!zoom && "zoom-none"}`}>
        <div className={`image-zoom-container ${zoom ? "showZoom" : "hideZoom"}`}>
            <img className={`pokemon-image ${image === 1 && "D3"}`} src={image === 0 ? pokemonData.sprites.other["official-artwork"].front_default : pokemonData.sprites.other.home.front_default} alt="" />
            <img className='close-zoom' src={arrowBtn} onClick={()=>setZoom(false)} />
            <div className='zoom-border'>
                    <img src={pokeball} alt="" />
                </div>
            <div className='zoom-info'>
                <h2>#{pokemonData.id}</h2>
                <h1>{fixingText(pokemonData.name)}</h1>
            </div>
        </div>
    </div>
  )
}

export default ZoomImage