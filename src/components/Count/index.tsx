import React from 'react'
import usePokemon from '../../hooks/usePokemon'

interface Props {
  queryKey?: string
}

const Count: React.FC<Props> = ({ queryKey }) => {
  const queryInfo = usePokemon({ queryKey })

  return <h3>You are looking at {queryInfo.data?.length} pokemon</h3>
}

export default Count