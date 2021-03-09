import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { PokemonResponse, PokemonResult } from '../types/pokemon'

const IndexPage = () => {

  const queryInfo = useQuery('pokemon', () =>
    axios
      .get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon')
      .then(res => {
        return res.data.results
      }),
  )

  console.log(queryInfo)

  return (
    <div>
      {queryInfo.data?.map((result: PokemonResult) => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}

export default IndexPage