//import react + components
import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Search from './components/Search'
import Form from './components/Form'
import Blogs from './components/Blogs'
import blogService from './services/blogbook'
import Notification from './components/Notification'
import Error from './components/Error'
import Login from './components/Login'
import loginService from './services/login'
import Togglable from './components/Togglable'





const App = () => {

  //establishes states
  const [ blogs, setBlogs ] = useState([]) 
  
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')
  const [ newLikes, setNewLikes ] = useState('')

  const [ newSearch, setNewSearch] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setNewUsername] = useState('') 
  const [password, setNewPassword] = useState('') 
  const [user, setUser] = useState(null)
  /*
  useEffect(() => {
    const initialBook = 'something'
    if (initialBook){
      setBlogs(initialBook)
    }
    blogService
       .getAll()
       .then(initialBook => {
         setBlogs(initialBook)     
   }).catch(error =>{
     setErrorMessage(
       `unable to connect to server`
     )
     setTimeout(() => {
       setErrorMessage(null)
     }, 5000)
   })
   }, [])
  
  
  
  */
  
  
  //use axios to get import db.json file requires json server to be run
  
  useEffect(() => {
   blogService
      .getAll()
      .then(initialBook => {
        setBlogs(initialBook)     
  }).catch(error =>{
    setErrorMessage(
      `unable to connect to server`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  })
  }, [])
 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


//handles button click when the title field is a new value
  const addBlog = () => {
    blogFormRef.current.toggleVisibility()
    // blog generated from  entry fields
    const blogObject = {
      title: newTitle,
      author: newAuthor,  
      url: newUrl,
      likes: newLikes
    }
    console.log('new',blogObject)
      //use axios to add blog to to blogs state array
       blogService
      .create(blogObject)
      .then( returnedBlog => {
        setAlertMessage(
          `Added ${returnedBlog.title} to the server`
        )
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000)
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('') 
        setNewUrl('')
        setNewLikes('')
    })
    .catch(error => {
      console.log("error:",error.response.data.error)
      setErrorMessage(
        error.response.data.error||`unable to connect to server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    
  }


//handles button click when title field is an existing value
  const updateBlog = () => {

    // asks user if this is what they ment to do
    const confirm = window.confirm(
      `${newTitle} is already added to blog list, replace the old blog entry with new one?`
    );

    // uses find method on blogs array to match change with existing entry 
    const blogToUpdate = blogs.find((item) => item.title === newTitle)
    
    //uses copy method to return a new object with old title and new other info
    const updatedBlog = { ...blogToUpdate, author: newAuthor, url: newUrl, likes: newLikes};
console.log('updated blog looks like', updatedBlog)
    //only executes if user selects "ok" in prompt window
    if (confirm) {
      blogFormRef.current.toggleVisibility()
      console.log('update',updatedBlog )
      //axios put method to update the server
      blogService
        .update(updatedBlog)
        .then((response) => {
          setAlertMessage(
            `Updated ${updatedBlog.title}'s entry`
          )
          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)

          //takes response from json server and alters state array, returns identical
          //object if id does not match. if the id does match alter object to be response
          setBlogs(blogs.map((item) => (item.id === response.id ? response : item)))
      })
      .catch(error => {
        setErrorMessage(
          `'${updatedBlog.title}' was removed by another user`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(n => n.id !== updatedBlog.id))     
      })
      }
  }

//handles delete button click
const removeEntry = (event) => {
  event.preventDefault()
 const id = event.target.value
 //when called promts user
 const confirm = window.confirm("are you sure?")
 // finds the blog to update
 const blogToUpdate = blogs.find((item) => item.id === id)
console.log(blogToUpdate)
 //check to see if the user confirms in the prompt window
 if (confirm){

  //calls axios delete method to remove the blog from the  database
  blogService
    .removeEntry(blogToUpdate.id)
    .then( response => {
      console.log(blogToUpdate.title)
      setAlertMessage(
        `Deleted ${blogToUpdate.title}'s entry`
      )
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)

      //uses filter method on blogs state array to return a new array without the removed entry
      setBlogs(blogs.filter(n => n.id !== id))
    })
    .catch(error => {
      setErrorMessage(
        `'${blogs[id-1].title}' was removed by another user`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.filter(n => n.id !== blogs[id-1].id))     
    })
}}


  //decides which function to call when the button is pressed 
  //depending on if the title is a new value or not
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // uses filter method on blogs array and creates a new array of blogs
    //match the title field.
    const isBlogExist = blogs.filter(
      (item) => item.title.toLocaleLowerCase() === newTitle.toLowerCase()
    ).length;

      //if the isblogExist array is empty then the title field
      //does not match any existing values, add the blog
    if (!isBlogExist) {
      addBlog();

      //otherwise update the entry
    } else {
      updateBlog();
    }

    //reset the entry fields
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewLikes('')
  };

  // handles logging in
  const handleLogin = (event) => {
    event.preventDefault()
    
      loginService.login({
        username, password,
      }).then(returnedUser => {
        window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(returnedUser))
      
      blogService.setToken(returnedUser.token)
      setUser(returnedUser)
      console.log('logging in with', username, password)
      setAlertMessage(`Welcome ${username}`)
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
      setNewUsername('')
      setNewPassword('')
      
    }).catch (error => {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  })
}



/*##### this is the async/await version of the function above#######
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      console.log('logging in with', username, password)
      setNewUsername('')
      setNewPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
######################################################################*/


 // handles logout
const logout = (event) => {
  event.preventDefault();
  const confirm = window.confirm("Do you want to logout?");
  if(confirm){
window.localStorage.removeItem('loggedBlogappUser')
setUser(null)
setAlertMessage(`Goodbye`)
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)

  }
}

//handles user input at login
  const handlePasswordChange =(event) => {
    setNewPassword(event.target.value)
  }
const handleUsernameChange =(event) => {
  setNewUsername(event.target.value)
}
  
  //these change the fields when user types
  const handleTitleChange = (event) => {
   setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
  setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
  setNewUrl(event.target.value)
  }
  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
    }
  const handleSearchChange = (event) => {
  setNewSearch(event.target.value)
  }

  const blogFormRef = useRef()
  
  //filters the blogs array to only display entrys that match the search field
  const blogsToShow =  blogs.filter(blog => blog.title.toLowerCase().includes(newSearch) === true)
    console.log('user looks like', user)
  

    
  return (

      //layout and call components
    <div>
      <h1>Blog List</h1>
      <Error message= {errorMessage}/>
      <Notification message={alertMessage} />
   
      <Togglable buttonLabel="search">
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange} />
      </Togglable>
      {user === null ?
      <div> 
      <Togglable buttonLabel="login">
      <Login handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange} handleLogin={handleLogin} username={username} password={password}/>
      </Togglable></div>:
      <div>
        <button onClick={logout}>Logout</button>
        <Togglable buttonLabel="add blog" ref={blogFormRef}>
      <Form addBlog={handleFormSubmit} newTitle={newTitle} handleTitleChange={handleTitleChange} newAuthor={newAuthor} handleAuthorChange={handleAuthorChange} newUrl={newUrl}
      handleUrlChange={handleUrlChange} newLikes={newLikes} handleLikesChange={handleLikesChange}
      />
      </Togglable>
        <Blogs blogsToShow={blogsToShow} Blog={Blog} removeEntry={removeEntry}/>
      </div>
      }
  
    </div>
    
  )
}

export default App