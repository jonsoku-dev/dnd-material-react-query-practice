import React, { useState } from 'react'
import Pokemon from '../components/Pokemon'

const IndexPage = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <div>
      <button onClick={() => setToggle(prev => !prev)}>toggle</button>
      {toggle && <Pokemon />}
    </div>
  )
}

export default IndexPage