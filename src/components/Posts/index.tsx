import React, { FunctionComponent } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { PostResult } from '../../types/post'

interface Props {
  setPostId: (postId: number) => void
}

const Posts: FunctionComponent<Props> = ({ setPostId }) => {
  const postsQuery = useQuery('posts', () => {
    return axios.get<PostResult[]>('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.data)
  })
  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? '...' : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          <span>Loading posts...</span>
        ) : (
          <ul>
            {postsQuery.data?.map(post => {
              return (
                <li key={post.id}>
                  <a onClick={() => setPostId(post.id)} href='#'>
                    {post.title}
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Posts
