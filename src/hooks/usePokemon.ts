import { useQuery } from 'react-query'
import axios from 'axios'
import { PokemonResponse } from '../types/pokemon'

interface UsePokemonProps {
  queryKey: string
}

function usePokemon({ queryKey }: UsePokemonProps) {
  return useQuery(queryKey, async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios
        .get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon')
        .then(res => {
          return res.data.results
        })
    },
  )
}

export default usePokemon