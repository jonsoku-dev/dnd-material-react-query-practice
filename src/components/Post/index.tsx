import React, { FunctionComponent } from 'react'
import { useQuery, QueryCache, useQueryClient } from 'react-query'
import axios from 'axios'
import { PostResult } from '../../types/post'

interface Props {
  postId: number
  setPostId: (postId: number) => void
}

const Post: FunctionComponent<Props> = ({ postId, setPostId }) => {

  const queryClient = useQueryClient()

  const postQuery = useQuery(['post', postId], async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios.get<PostResult>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((res) => res.data)
    }, {
      initialData: () => queryClient.getQueryCache().find<PostResult[]>('posts')?.state.data?.find(post => post.id === postId),
      // staleTime: 1000, // 다시가져오지않으려면 시간을 정해주면 된다.
    },
  )

  console.log(queryClient.getQueryCache().find<PostResult[]>('posts')?.state.data?.find(post => post.id === postId))


  return (
    <div>
      <a onClick={() => setPostId(-1)} href={'#'}>
        Back
      </a>
      <br />
      <br />
      {postQuery.isLoading
        ? <div>Loading...</div>
        : <div>
          {postQuery.data?.title}
          <br />
          <br />
          {postQuery.isFetching ? 'Updating...' : null}
        </div>
      }
    </div>
  )
}

export default Post
