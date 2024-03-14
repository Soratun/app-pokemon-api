import React, { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';

const PokemonList = () => {
    const [pokemonUrls, setPokemonUrls] = useState([]);
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        axios.get(url)
        .then(response => {
            setPokemonUrls(response.data.results.map(p => p.url));
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    const getPokemonData = async () => {
        try {
            const pokemonData = await Promise.all(pokemonUrls.map(url => axios.get(url)));
            setPokemon(pokemonData.map(response => response.data));
            // console.log(pokemonData);
        } catch (error) {
            console.log(error);
        }
    }
    

    return(
        <div>
            <h1 className='font-bold text-lg'>API </h1>
            <h1 className='font-bold text-lg'>Pokemon</h1>
            <button onClick={getPokemonData} 
            className='bg-indigo-500 rounded-md w-1/8 p-2
            text-sm text-white'>Get Pokemon dex</button>
            <div className='grid grid-cols-6 gap-4'>
                <div className='col-start-3 col-span-4'>
                {pokemon.length > 0 && 
                        pokemon.map(p => (
                            <div key={p.id} className="w-1/2 border border-gray-500 text-left bg-green-500 p-5 m-1">
                                <div className="flex flex-wrap">
                                    <img src={p.sprites.front_default} alt={p.name} className="w-1/2 bg-white" />
                                    <img src={p.sprites.back_default} alt={p.name} className="w-1/2 bg-white" />
                                </div>
                                <br />
                                <div className="flex flex-wrap">
                                    <p className='font-bold'>Name: <span> {p.name.toUpperCase()}</span></p>
                                    
                                </div>
                                {p.types.map((type, index) => (
                                    <div key={index} className="flex flex-wrap">
                                        <p key={index} className='font-bold'>Type {index + 1}: 
                                        <span> {type.type.name}</span></p>
                                    </div>                        
                                ))}
                                <p className='font-bold'>Base stat:</p>
                                {p.stats.map((stat, index) => (
                                    <p key={index}>
                                        {stat.stat.name}= {stat.base_stat}
                                    </p>
                                ))}
                            </div>
                        ))}    
                </div>
            </div>
        </div>
    )
}

export default PokemonList;
