import React, { useState } from 'react'
import Pokemon from '../components/Pokemon'
import Count from '../components/Count'
import PokemonSearch from '../components/PokemonSearch'

const IndexPage = () => {
  const [pokemon, setPokemon] = useState<string>('')
  return (
    <div>
      <input value={pokemon} onChange={e =>setPokemon(e.target.value)} />
      <PokemonSearch pokemon={pokemon} />
      {/*<Count queryKey={'pokemon1'} />*/}
      {/*<Pokemon queryKey={'pokemon1'} />*/}
    </div>
  )
}

export default IndexPage