import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { PokemonResponse, PokemonResult } from '../types/pokemon'

const IndexPage = () => {

  const queryInfo = useQuery('pokemon', async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (true) {
        throw new Error('Test Error')
      }
      return axios
        .get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon')
        .then(res => {
          return res.data.results
        })
    },
  )

  console.log(queryInfo)

  return queryInfo.isLoading ? (
      <span>Loading ...</span>)
    : queryInfo.isError ? (
      <span>error...</span>
    ) : (
      <div>
        {queryInfo.data?.map((result) => {
          return <div key={result.name}>{result.name}</div>
        })}
      </div>
    )
}

export default IndexPage