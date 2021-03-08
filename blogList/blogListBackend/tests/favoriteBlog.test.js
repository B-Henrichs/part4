const listHelper = require('../utils/list_helper.js')
const blogList = require('../utils/blogs_for_test.js') //Put blog array in separate file to make this one easier to read


describe('the blog with the most votes', ()=>{
    
    test('out of this list',()=>{
        const result =listHelper.highestLikes(blogList.blogs)

        expect(result).toEqual(12)
    })
})