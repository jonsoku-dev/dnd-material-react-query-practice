import React from 'react'
import Posts from '../components/Posts'
import Post from '../components/Post'

const IndexPage = () => {
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

export default IndexPage