import axios from 'axios'

//sets location to pull from
const baseUrl = '/api/blogs'

//first pass sets base phonebook from json server
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)  
}

//adding an entry
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

//changing a number of an existing entry
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

//deletes entry
const removeEntry = (blog) =>{
  const request =axios.delete(`${baseUrl}/${blog}`)
    return( request)
    .then(response => response.data)
  }

const services = {
  getAll, create, update, removeEntry
}

export default services