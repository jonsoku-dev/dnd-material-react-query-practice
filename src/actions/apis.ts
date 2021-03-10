import axios from 'axios'
import { PostResult } from '../types/post'

export const fetchPosts = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return await axios.get<PostResult[]>('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.data)
}