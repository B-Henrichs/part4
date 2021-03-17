//#################
//this file defines how blogs are structured. the types of the data what requirements they have
//################
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')



  const blogSchema = new mongoose.Schema({
    
    title:{
      type: String,
      minlength: 3,
      required: true,
      unique: true
    },
    author:{
      type: String,
      minlength: 3,
      required: true,
    },
    url:{
      type: String,
      minlength: 3,
      required: true,
      unique: true
    },
    likes:{
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }

    
  })
  
//use the plugin to that checks if values are unique
  blogSchema.plugin(uniqueValidator)

 

// sets the scheme and passes it paramaters for how the data
// should be viewed
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)