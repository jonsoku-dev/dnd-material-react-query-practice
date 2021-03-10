import React, { FunctionComponent } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { PostResult } from '../../types/post'

interface Props {
  postId: number
  setPostId: (postId: number) => void
}

const Post: FunctionComponent<Props> = ({ postId, setPostId }) => {

  const postQuery = useQuery(['post', postId], async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios.get<PostResult>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((res) => res.data)
    },
  )

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
