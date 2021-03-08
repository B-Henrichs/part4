import React from 'react'

const Blogs = ({Blog, blogsToShow, removeEntry}) => {  
    //returns layout and uses map method on array returned with search filter(if any)
    //map function takes intrustions from Person component
    return(  
        <div>
            <h2>Blogs</h2>        
                <ul>
                    {blogsToShow.map(blog =>
                        <Blog key={blog.title} blog={blog} removeEntry={removeEntry}/>    
                        )}
                </ul>
      </div>
)}
export default Blogs