import React,{useState,useEffect} from 'react'
import EvoCard from './EvoCard'
import useFetch from '../../Function/useFetch'
import GetData from "../../Function/GetData"

function Evotab({pokemonData,pokemonSpecies,fixingText,pokemon,setPokemon,setLoad,setSpecies}) {
    const changeUrl = (str)=>{
        return str.slice(42,str.length-1)
    }
    const changeUrl2 = (str)=>{
        return str.slice(34,str.length-1)
    }
    //console.log(pokemonSpecies.evolution_chain)
    const {data,error,loading} = useFetch(pokemonSpecies.evolution_chain.url)
    //if(data) console.log(data.data)
    let chainArray = [];
    const pushArray = () => {
        if(data){
            chainArray.push({
                id: changeUrl(data.data.chain.species.url),
                lv : 1,
            })
            if(data.data.chain.evolves_to.length === 1){
                chainArray.push({
                    id: changeUrl(data.data.chain.evolves_to[0].species.url),
                    lv : data.data.chain.evolves_to[0].evolution_details[0].min_level,
                })
                if(data.data.chain.evolves_to[0].evolves_to.length >= 1){
                    chainArray.push({
                        id: changeUrl(data.data.chain.evolves_to[0].evolves_to[0].species.url),
                        lv : data.data.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level,
                    })
                }
            }else if(data.data.chain.evolves_to.length > 1){
                data.data.chain.evolves_to.forEach((i,n) => {
                    chainArray.push({
                        id: changeUrl(i.species.url),
                        lv : i.evolution_details[0].min_level === null ? 1 : i.evolution_details[0].min_level,
                        condition: i.evolution_details[0].item ? fixingText(i.evolution_details[0].item.name) : i.evolution_details[0].min_happiness ? "Min Affection : " + i.evolution_details[0].min_happiness : null  ,
                    })
                });
            }
        }
    }

    if(data) pushArray()
    //console.log(chainArray)
    const addVariety = () => {
            const  species = GetData (`https://pokeapi.co/api/v2/pokemon-species/${chainArray.length > 0 && chainArray[chainArray.length-1].id}`);
            //console.log(species)
            if(species){
                if(pokemonSpecies.varieties.length === 1){
                    if(species.varieties.length > 1){
                        species.varieties.forEach((i,n)=>{
                            if(i.is_default === false)
                            chainArray.push({
                                id: changeUrl2(i.pokemon.url),
                                lv: chainArray.length > 0 ? chainArray[chainArray.length-1].lv : "1",
                            })
                        })
                    }
                }else if(pokemonSpecies.varieties.length > 1){
                    pokemonSpecies.varieties.forEach((i,n)=>{
                        if(i.is_default === false)
                        chainArray.push({
                            id: changeUrl2(i.pokemon.url),
                            lv: chainArray.length > 0 ? chainArray[chainArray.length-1].lv : "1",
                        })
                    })
                }
                
            }
    }
    addVariety()
    //console.log(chainArray)
    const printEvo = () =>{
        if(chainArray.length > 0){
            return chainArray.map((i,n)=>{
                //console.log(i)
                return <EvoCard fixingText={fixingText} lvl={i.lv} url={i.id} key={n} color={pokemonSpecies.color.name} pokemon={pokemon} setPokemon={setPokemon} setLoad={setLoad} setSpecies={setSpecies} />
            })
        }
    }
    if(data)return (
        <div className='evo-tab-cont'>
            {printEvo()}
        </div>
    )
    }

export default Evotab