import React from 'react'
import "../../Style/TabSection.scss"

function StatsTab({pokemonData,versus}) {
    //console.log(pokemonData)
    const widthBar = (base) =>{
        if(base > 250){
            return (base / 255)*100;
        }else if(base > 121){
            return ((base / 255) *100 ) + 4;
        }else {
            return ((base / 255) *100 ) + 7;
        }
    }

  if(pokemonData) return (
    <div className={`stats-tab-cont ${versus && "versus-stats-cont"}`}>
        <div className='stats-tab'>
            <div className='stat-info'>
                <p>HP</p>
                <h4>{pokemonData.stats[0].base_stat}</h4>
            </div>
            <div className='bar-info'>
                <div className='grey-bar'> </div>
                <div className='stat-bar hp' style={{width: `${widthBar(pokemonData.stats[0].base_stat)}%`}}></div>
            </div>
        </div>
        <div className='stats-tab'>
            <div className='stat-info'>
                <p>Attack</p>
                <h4>{pokemonData.stats[1].base_stat}</h4>
            </div>
            <div className='bar-info'>
                <div className='grey-bar'> </div>
                <div className='stat-bar att' style={{width: `${widthBar(pokemonData.stats[1].base_stat)}%`}}></div>
            </div>
        </div>
        <div className='stats-tab'>
            <div className='stat-info'>
                <p>Deffend</p>
                <h4>{pokemonData.stats[2].base_stat}</h4>
            </div>
            <div className='bar-info'>
                <div className='grey-bar'> </div>
                <div className='stat-bar deff' style={{width: `${widthBar(pokemonData.stats[2].base_stat)}%`}}></div>
            </div>
        </div>
        <div className='stats-tab'>
            <div className='stat-info'>
                <p>Sp. Attack</p>
                <h4>{pokemonData.stats[3].base_stat}</h4>
            </div>
            <div className='bar-info'>
                <div className='grey-bar'> </div>
                <div className='stat-bar spatt' style={{width: `${widthBar(pokemonData.stats[3].base_stat)}%`}}></div>
            </div>
        </div>
        <div className='stats-tab'>
            <div className='stat-info'>
                <p>Sp. Deff</p>
                <h4>{pokemonData.stats[4].base_stat}</h4>
            </div>
            <div className='bar-info'>
                <div className='grey-bar'> </div>
                <div className='stat-bar spdeff' style={{width: `${widthBar(pokemonData.stats[4].base_stat)}%`}}></div>
            </div>
        </div>
        <div className='stats-tab'>
            <div className='stat-info'>
                <p>Speed</p>
                <h4>{pokemonData.stats[5].base_stat}</h4>
            </div>
            <div className='bar-info'>
                <div className='grey-bar'> </div>
                <div className='stat-bar spd' style={{width: `${widthBar(pokemonData.stats[5].base_stat)}%`}}></div>
            </div>
        </div>
        <div className='stats-tab'>
            <div className='stat-info'>
                <p>TOTAL</p>
                <h4>{pokemonData.stats[5].base_stat+pokemonData.stats[4].base_stat+pokemonData.stats[3].base_stat+pokemonData.stats[2].base_stat+pokemonData.stats[1].base_stat+pokemonData.stats[0].base_stat}</h4>
            </div>
            <div className='bar-info'>
                <div className='grey-bar'> </div>
                <div className='stat-bar total' style={{width: `${(pokemonData.stats[5].base_stat+pokemonData.stats[4].base_stat+pokemonData.stats[3].base_stat+pokemonData.stats[2].base_stat+pokemonData.stats[1].base_stat+pokemonData.stats[0].base_stat)/780*100}%`}}></div>
            </div>
        </div>
    </div>
  )
}

export default StatsTab