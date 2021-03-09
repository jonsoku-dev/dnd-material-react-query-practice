import React from 'react'
import usePokemon from '../../hooks/usePokemon'

interface Props {
  queryKey?: string
}

const Pokemon: React.FC<Props> = ({ queryKey }) => {
  const queryInfo = usePokemon({ queryKey })

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