const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesAtEnd =[]
  blogs.map(blog =>{
    likesAtEnd.push(blog.likes)
  })
  const reducer = (acc, item) => {
    return acc + item
  }

  return likesAtEnd.reduce(reducer, 0)
}


const averageLikes = (blogs) => {
  const blogLikes = []
  blogs.map(blog => {
    blogLikes.push(blog.likes)
  })

  const reducer = (acc, item) => {
    return acc + item
  }

  return blogLikes.length === 0
    ? 0
    : blogLikes.reduce(reducer, 0) / blogLikes.length
}

const highestLikes = (blogs) => {
  const blogLikes = []
  blogs.map(blog => {
    blogLikes.push(blog.likes)
  })

  const selectedBlog = Math.max(...blogLikes)

  return selectedBlog
}




/*const mostBlogs = (blogs) => {
  const blogCount =[]
  blogs.map(blog =>{
    blogCount.push(blog)
  })
}*/

module.exports = { dummy, averageLikes, highestLikes, totalLikes }




/*const palindrome = (string) => {
    return string
      .split('')
      .reverse()
      .join('')
  }
  
  const average = (array) => {
    const reducer = (sum, item) => {
      return sum + item
    }
    
    return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
    }
  
  
  module.exports = {
    palindrome,
    average,
  }*/