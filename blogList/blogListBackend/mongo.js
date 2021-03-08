
// imports "process" and "mongoose" libraries(?)
const process = require('process')
const mongoose = require('mongoose')

// if the number of arguments passed when called 
// in the command-line ask the user to pass it the password
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

// sets the password to the 2nd argument
// passed in the command-line
const password = process.argv[2]

// sets the url to the address provided by atlas
const url =

//     THIS CONNECTS TO THE SAME CLUSTER AS PHONEBOOK 

  `mongodb+srv://fullstack:${password}@cluster0.h3g38.mongodb.net/phonebook-app?retryWrites=true&w=majority`

  //       FREE VERSION ONLY SUPPORTS ONE CLUSTER WORKS GREAT

  // tells mongoose to connect to the url with the settings provided
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


// defines how an entry will be stored in the Atlas database
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// tells mongoose to use the schema above
const Blog = mongoose.model('Blog', blogSchema)



// handles creating a new entry with the 3rd and 4th arguments
// passed from the command-line
const blog = new Blog({
  title: process.argv[3],
  author: process.argv[4],
  url: process.argv[5],
  likes: process.argv[6]
})

// if there isnt a third argument just print the bloglist
// otherwise saves the blog created above
if(!process.argv[3]) {
  console.log('bloglist:')
  Blog.find({}).then(result => {
    result.forEach(res => {
      console.log(res.title, res.author, res.url, res.likes)
    })
    mongoose.connection.close()
  })
} else {
  blog.save().then(() => {
    console.log('blog saved!')
    mongoose.connection.close()
  })
}