import React, { FunctionComponent } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { PokemonSingleResponse } from '../../types/pokemon'

interface Props {
  pokemon: string
}

const PokemonSearch: FunctionComponent<Props> = ({ pokemon }) => {
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  const queryInfo = useQuery(['pokemon', pokemon], async () => {
    const promise = axios.get<PokemonSingleResponse>(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
      cancelToken: source.token,
    })
      .then(res => res.data)

    promise.cancel = () => {
      source.cancel('Query was cancelled by React Query')
    }

    return promise
  }, {
    enabled: pokemon.length > 0,
  })

  console.log(queryInfo)

  return queryInfo.isLoading ? (
      <span>Loading ...</span>)
    : queryInfo.isError ? (
      <span>error...</span>
    ) : (
      <div>
        {queryInfo.data?.sprites?.front_default ? (
          <img src={queryInfo.data?.sprites?.front_default} alt='pokemon' />
        ) : (
          <span>Pokemon not found.</span>
        )}
        <br />
      </div>
    )
}

export default PokemonSearch
