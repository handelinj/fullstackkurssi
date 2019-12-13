import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import  { useField } from './hooks'
//import BlogCreator from './components/BlogCreator'

function App() {
  const usernameField = useField('text')
  const passwordField = useField('text')
  const titleField = useField('text')
  const urlField = useField('text')
  const authorField = useField('text')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(null)
  const [message, setMessage] = useState('')
  const [createBlogsVisible, setCreateBlogsVisible] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = usernameField.value
      const password = passwordField.value
      const user = await loginService.login({
        username, password,
      })
      const blogs = await blogService.getAll()
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setUser(user)
      /*username.reset()
      password.reset()*/
      setBlogs(blogs)
      blogService.setToken(user.token)
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage('')
      }, 5000)
      /* setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
    }
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.getAll().then(allBlogs => {
        setBlogs(allBlogs)})
      blogService.setToken(user.token)
    }
  }, [])
  if(user===null) {
    return (
      <>
      <div style={{ color: 'red' }}>{message}</div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            {...usernameField}
            reset=""
          />
        </div>
        <div>
          password
          <input
            {...passwordField}
            type="password"
            reset=""
          />
        </div>
        <button type="submit">login</button>
      </form>
        </>
    )
  }
  else {
    const addBlog = () => (() => {
      const newBlog = {
        title: titleField.value,
        url: urlField.value,
        author: authorField.value
      }
      blogService.create(newBlog).then(() => {
        blogService.getAll().then(response =>
          setBlogs(response))
        setMessage('Blog ' + titleField.value + ' added successfully')
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
    })
    const blogList = blogs !== null ?
      blogs.map(blog => <Blog key={blog.id} blog={blog} />)
      : <p>No blogs found (yet)</p>
    return (
      <>
      <h2>Blogs:</h2>
      <p style={{ color: 'green' }}>{message}</p>
      <p>Logged in as {user.username}
        <button onClick={() => {window.localStorage.removeItem('loggedBlogUser'); window.location.reload()}}>Logout</button>
      </p>
      <div style={{ display: createBlogsVisible ? 'block' : 'none' }}>
        <h2>Create new</h2>
        <div>
          title:
          <input
            {...titleField} reset=""></input>
        </div>
        <div>
          author:
          <input
            {...authorField} reset=""></input>
        </div>
        <div>
          url:
          <input
            {...urlField} reset=""></input>
        </div>
        <div>
          <button onClick={addBlog()}>create</button>
          <button onClick={() => setCreateBlogsVisible(false)}>cancel</button>
        </div>
      </div>
      <div style={{ display: !createBlogsVisible ? 'block' : 'none' }}>
        <button onClick={() => setCreateBlogsVisible(true)}>new blog</button>
      </div>
      <hr></hr>
      {blogList}
      </>
    )
  }
}

export default App
