import React, { FunctionComponent } from 'react'
import Post from '../components/Post'
import Posts from '../components/Posts'

interface Props {
}

const PostPage: FunctionComponent<Props> = () => {
  const [postId, setPostId] = React.useState(-1)
  return (
    <div>
      {postId > -1 ? (
          <Post
            postId={postId}
            setPostId={setPostId} />
        )
        : (
          <Posts setPostId={setPostId} />
        )
      }
    </div>
  )
}

export default PostPage
