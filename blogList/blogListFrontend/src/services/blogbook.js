import axios from 'axios'

//sets location to pull from
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

//first pass sets base blogbook from json server
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)  
}

//adding an entry
/*const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}*/
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}





//changing a number of an existing entry
const update = async newObject => {
  //const request = axios.put(`${baseUrl}/${id}`, newObject)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return response.data
}



//deletes entry
const removeEntry = (blog) =>{
  const config = {
    headers: { Authorization: token },
  }
  const request =axios.delete(`${baseUrl}/${blog}`,config)
    return( request)
    .then(response => response.data)
  }

const services = {
  getAll, create, update, removeEntry, setToken
}

export default services