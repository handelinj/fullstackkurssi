import React,  { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const [fullyVisible, setVisible] = useState(false)

  const hideWhenVisible = { display: fullyVisible ? 'none' : '' }
  const showWhenVisible = { display: fullyVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!fullyVisible)
  }

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} onClick={toggleVisibility}>{blog.title} {blog.author}</div>
      <div style={showWhenVisible} onClick={toggleVisibility}>
        <div>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes} Likes <button>Like</button></div>
        <div>Added by {blog.user.name}</div>
      </div>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog