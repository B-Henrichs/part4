import React from 'react'

const Form = ({addBlog, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange, newLikes, handleLikesChange}) => {
  
  return (
    <div>
    <h3>Update Blog List</h3>
  <form onSubmit ={addBlog}>
    <div>
      title: <input 
        value={newTitle} 
        onChange={handleTitleChange}/>
    </div>
    <div>
        author:<input 
        value={newAuthor}
        onChange={handleAuthorChange}/>
    </div>
    <div>
        url:<input 
        value={newUrl}
        onChange={handleUrlChange}/>
    </div>
    <div>
        likes:<input 
        value={newLikes}
        onChange={handleLikesChange}/>
    </div>
    <div>
      <button type="submit">update Blog list</button>
    </div>
  </form>
  </div>
  )
}
export default Form