import React, { FunctionComponent } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { PostResult } from '../../types/post'
import { Link } from 'react-router-dom'
import { fetchPost } from '../../actions/apis'

interface Props {
  postId: string
}

const Post: FunctionComponent<Props> = ({ postId }) => {

  const queryClient = useQueryClient()

  const postQuery = useQuery(['post', postId], () => fetchPost(postId.toString()), {
      initialData: () => queryClient.getQueryCache().find<PostResult[]>('posts')?.state.data?.find(post => post.id === +postId),
      // staleTime: 1000, // 다시가져오지않으려면 시간을 정해주면 된다.
    },
  )
  return (
    <div>
      <Link to={`/post`}>
        Back
      </Link>
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
