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

  blogSchema.set('toJSON', {
    virtuals: true,
    autoIndex: false,
    transform: (doc, converted) => {
      delete converted._id;
      delete converted.__v;
    }
})

module.exports = mongoose.model('Blog', blogSchema)