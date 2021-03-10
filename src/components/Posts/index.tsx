import React, { FunctionComponent } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { fetchPost, fetchPosts } from '../../actions/apis'

interface Props {
}

const Posts: FunctionComponent<Props> = () => {
  const queryClient = useQueryClient()
  const [count, increment] = React.useReducer(d => d + 1, 0)

  const postsQuery = useQuery('posts', fetchPosts, {
    onSuccess: (data) => {
      increment()
    },
    onError: (error) => {
    },
    onSettled: (data, error) => {
    },
  })
  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? '...' : null} {count}</h1>
      <div>
        {postsQuery.isLoading ? (
          <span>Loading posts...</span>
        ) : (
          <ul>
            {postsQuery.data?.map(post => {
              return (
                <li key={post.id} onMouseEnter={() => {
                  queryClient.prefetchQuery(['post', post.id], () =>
                    fetchPost(post.id.toString()),
                  )
                }}>
                  <Link to={`/post/${post.id}`}>
                    {post.title}
                  </Link>
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
