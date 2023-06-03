import React from 'react'
import "../../Style/TabSection.scss"
import "../../Style/abstracts/pokemon-color.scss"
import typeBarImg from '../minicomp/typeBarImg'


function AboutTab({pokemonData,pokemonSpecies}) {
  //console.log(pokemonData)
  //console.log(pokemonSpecies)
  const fixingText = (str) =>{
    str = str.replace(/-/g, " ");
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className='about-tab-cont'>
        <h4>Abilites</h4>
        <div className='abillities-cont'>
          {pokemonData.abilities.map((i,n)=>{
            return <div className={`bar-details ${pokemonSpecies.color.name} ${pokemonData.abilities.length >= 3 && "abilities-bar"}`} key={n}> 
                    <p>{fixingText(i.ability.name)}</p>
                  </div>
          })}
        </div>
        <div className='second-cont'>
          <div className='s-child-cont'>
              <h4>Height</h4>
              <div className={`bar-details ${pokemonSpecies.color.name}`}>
                <p>{(pokemonData.height/10).toFixed(1) + " m" + " ("+ (pokemonData.height*10) + " cm)" }</p>
              </div>
          </div>
          <div className='s-child-cont'>
              <h4>Weight</h4>
              <div className={`bar-details ${pokemonSpecies.color.name}`}>
                <p>{(pokemonData.weight/10) + " kg " + "(" +(pokemonData.weight/4.536).toFixed(1)+ " lbs)" } </p>
              </div>
          </div>
        </div>
        <div className='second-cont'>
          <div className='s-child-cont'>
              <h4>Shape</h4>
              <div className={`bar-details shaping ${pokemonSpecies.color.name}`}>
                <p>{fixingText(pokemonSpecies.shape.name)}</p>
                <img src={require(`../../Images/pokemon-shape/${pokemonSpecies.shape.name}.png`)} alt="" />
              </div>
          </div>
          <div className='s-child-cont'>
              <h4>Habitat</h4>
              <div className={`bar-details ${pokemonSpecies.color.name}`}>
                <p>{pokemonSpecies.habitat === null ? " - " :fixingText(pokemonSpecies.habitat.name) }</p>
              </div>
          </div>
        </div>
        <div className='second-cont'>
          <div className='s-child-cont'>
              <h4>Egg Group</h4>
              <div className={`bar-details ${pokemonSpecies.color.name}`}>
                <p>{`${fixingText(pokemonSpecies.egg_groups[0].name) + (pokemonSpecies.egg_groups.length > 1 ? " & " + fixingText(pokemonSpecies.egg_groups[1].name) : "" ) }  `}</p>
              </div>
          </div>
          <div className='s-child-cont'>
              <h4>Generation</h4>
              <div className={`bar-details ${pokemonSpecies.color.name}`}>
                <p>{(pokemonSpecies.generation.name.charAt(0).toUpperCase() + pokemonSpecies.generation.name.slice(1,10)+ " " + pokemonSpecies.generation.name.slice(11).toUpperCase())}</p>
              </div>
          </div>
        </div>
    </div>
  )
}

export default AboutTab