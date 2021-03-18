import React from 'react'
const Login = ({
  handleLogin,
   username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  logout}) => { 
    return(
      <div>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
        <label>username</label>
          
            <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        
        <label>password</label>
            <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        
        <button type="submit">login</button>
      </form>
     
      
      </div>
      
      
      
            )
        }
        
export default Login