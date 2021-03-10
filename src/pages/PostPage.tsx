import React, { FC, useEffect, useReducer } from 'react'
import Posts from '../components/Posts'
import { useQueryClient } from 'react-query'
import { fetchPosts } from '../actions/apis'

interface Props {
}

const PostPage: FC<Props> = () => {
  const queryClient = useQueryClient()
  const [show, toggle] = useReducer(d => !d, false)

  useEffect(() => {
    queryClient.prefetchQuery('posts', fetchPosts)
  },[])

  return (
    <div>
      <button onClick={toggle}>show posts</button>
      {show && <Posts />}
    </div>
  )
}

export default PostPage
