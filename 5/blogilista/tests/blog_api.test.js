const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')
/*
beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

test('blogs are returned as json and there is a correct amount of them', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogs.body.length).toBe(blogsAtEnd.length)
})

test('the id field is called "id" and not "_id"' , async () => {
    const blogs = await api
        .get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined();
})

test('blogs can be added' , async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
        title: 'title',
        author: 'autho',
        url: 'wwwwwwwww',
        likes: 2
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toEqual(blogsAtStart.length + 1)

})

test('the Likes field defaults to zero' , async () => {
    const newBlog = {
        title: 'title',
        author: 'autho',
        url: 'wwwwwwwww'
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length-1].likes).toEqual(0)
})
test('If fields are missing 400' , async () => {
    const newBlog = {
        title: 'title',
        author: 'autho'
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})
*/
test('updating a blog' , async () => {
    const blogToUpdate = {
        likes: 5000000000000,
        title: "aaa",
        author: "231232122",
        url: "www.google.com",
    }
    await api
    .put('/api/blogs/5d2da05c9ef5e827f0e3728a')
    .send(blogToUpdate)
    .expect(204)
})
afterAll(() => {
  mongoose.connection.close()
})