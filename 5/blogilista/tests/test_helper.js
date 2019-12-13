const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "aaa",
        author: "231232122",
        url: "www.google.com",
        likes: 3,
        id: "5d2871afbfcb154288cf7439"
    },
    {
        title: "aaaa1231",
        author: "231232122",
        url: "www.google.com",
        likes: 5,
        id: "5d28770c07e5c22b18f0e2ad"
    }
]

const initialUsers = [
  {
    username: "user1",
    name: "bla blaa",
    password: "123456"
  },
  {
    username: "us2",
    name: "namae",
    password: "1234"
}
]


/*
const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}*/

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, initialUsers
}