import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../components/Post'

interface Props {
}

const PostDetailPage: FC<Props> = () => {
  const params = useParams<Record<string, string>>()
  return (
    <Post postId={params.postId} />
  )
}

export default PostDetailPage
