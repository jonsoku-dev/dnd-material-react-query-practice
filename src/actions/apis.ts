import axios from 'axios'
import { PostResult } from '../types/post'

export const fetchPosts = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return await axios.get<PostResult[]>('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.data)
}

export const fetchPost = async (postId: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return axios.get<PostResult>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => res.data)
}