import axios from 'axios'
const baseUrl = '/api/users'

const getUserBlogs = async id => {
  const request = await axios.get(baseUrl + '/' + id)
  return request.then(response => response.data.blogs)
}

export default { getUserBlogs }