const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false);
const url = process.env.MONGODB_URI

console.log('connecting to', url)

async () => {
  try{
     await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true ,  autoIndex: false})

    console.info('connected to MongoDB')
  }
  catch(error) {
   console.error('error connecting to MongoDB:', error.message)
  }
}

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