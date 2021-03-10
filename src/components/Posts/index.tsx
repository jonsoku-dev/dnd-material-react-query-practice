import React, { FunctionComponent } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { PostResult } from '../../types/post'
import { Link } from 'react-router-dom'

interface Props {
}

const fetchPosts = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return await axios.get<PostResult[]>('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.data)
}

const Posts: FunctionComponent<Props> = () => {
  const [count, increment] = React.useReducer(d => d + 1, 0)

  // // 애초에 전체 post 을 여기서 캐싱해둔다.
  // const queryClient = useQueryClient()
  // const postsQuery = useQuery('posts', async () => {
  //   const posts = await axios.get<PostResult[]>('https://jsonplaceholder.typicode.com/posts')
  //     .then(res => res.data)
  //   posts.forEach(post => {
  //     queryClient.setQueryData(['post', post.id], post)
  //   })
  //   return posts
  // })

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
                <li key={post.id}>
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
