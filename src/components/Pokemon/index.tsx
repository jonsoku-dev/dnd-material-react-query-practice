import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { PokemonResponse } from '../../types/pokemon'

interface Props {
  queryKey: string
}

const Pokemon: React.FC<Props> = ({ queryKey }) => {
  const queryInfo = useQuery(queryKey, async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios
        .get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon')
        .then(res => {
          return res.data.results
        })
    }, {
      cacheTime: 5000,  // toggle 같은 행위로 inactive 되었을때 캐시를 유지하는 시간
    },
  )

  return queryInfo.isLoading ? (
      <span>Loading ...</span>)
    : queryInfo.isError ? (
      <span>error...</span>
    ) : (
      <div>
        {queryInfo.data?.map((result) => {
          return <div key={result.name}>{result.name}</div>
        })}
        <br />
        {queryInfo.isFetching ? 'Updating ...' : null}
      </div>
    )
}

export default Pokemon