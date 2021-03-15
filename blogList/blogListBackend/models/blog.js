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
  

  blogSchema.plugin(uniqueValidator)

 /* old settings, trying settings from answer
  blogSchema.set('toJSON', {
    virtuals: true,
    autoIndex: false,
    transform: (doc, converted) => {
      delete converted._id;
      delete converted.__v;
    }
})*/


blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)