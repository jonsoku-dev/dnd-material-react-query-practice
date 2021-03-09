import React from 'react'
import Pokemon from '../components/Pokemon'
import Count from '../components/Count'

const IndexPage = () => {
  return (
    <div>
      <Count queryKey={'pokemon1'} />
      <Pokemon queryKey={'pokemon1'} />
    </div>
  )
}

export default IndexPage