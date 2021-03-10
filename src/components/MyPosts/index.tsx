import React, { FunctionComponent } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

interface Props {
}

const email = 'Sincere@april.biz'

const MyPosts: FunctionComponent<Props> = () => {

  const userQuery = useQuery('user', () =>
    axios.get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
      .then(res => res.data[0]),
  )

  const postsQuery = useQuery('posts', () =>
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userQuery.data?.id}`)
        .then(res => res.data), {
      enabled: !!userQuery.data?.id,
    },
  )

  return userQuery.isLoading ? (
    <span>Loading user...</span>
  ) : (
    <div>
      <div>User Id: {userQuery.data.id}</div>
      <br />
      <br />
      {postsQuery.isLoading ? (
        <span>Loading posts...</span>
      ) : (
        <div>Post Count: {postsQuery.data.length}</div>
      )}
    </div>
  )
}

export default MyPosts
