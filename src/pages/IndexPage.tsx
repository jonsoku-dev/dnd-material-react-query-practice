import React from 'react'
import Pokemon from '../components/Pokemon'

const IndexPage = () => {
  return (
    <div>
      <Pokemon queryKey={'pokemon1'}/>
      <Pokemon queryKey={'pokemon1'}/>
      <Pokemon queryKey={'pokemon1'}/>
    </div>
  )
}

export default IndexPage