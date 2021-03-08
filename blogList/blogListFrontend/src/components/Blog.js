import React from 'react'
const Blog = ({ blog, removeEntry }) => {
  return (
    <li>{blog.title} {blog.author} {blog.url} {blog.likes} <button onClick={removeEntry} value={blog.id}>Delete</button> </li>
  )
}
export default Blog