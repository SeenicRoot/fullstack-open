const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return _.sumBy(blogs, 'likes')
}

const favoriteBlog = blogs => {
  return _.maxBy(blogs, 'likes') || {}
}

// const mostBlogs = blogs => {
//   const authors = _.reduce(blogs, (authorsList, blog) => {
//     // get index of blog's author in authorsList
//     const index = _.findIndex(authorsList, element => element.author === blog.author)
//     if (index === -1) { // if author isn't in authors list yet, add him
//       authorsList.push({author: blog.author, blogs: 1})
//       return authorsList
//     }
//     // author is in list, add one to his blogs count
//     const author = authorsList[index]
//     const incrementedAuthor = {...author, blogs: author.blogs + 1}
//     authorsList[index] = incrementedAuthor
//     return authorsList
//   }, [])
//   return authors.reduce((mostBlogsAuthor, nextAuthor) => {
//     if (Object.keys(mostBlogsAuthor).length === 0) {
//       return nextAuthor
//     }
//     return nextAuthor.blogs > mostBlogsAuthor.blogs ? nextAuthor : mostBlogsAuthor
//   }, {})
// }

const mostBlogs = blogs => {
  const authors = _.countBy(blogs, 'author')
  // convert object to array of pairs to allow to find the pair with the most blogs
  const biggestAuthor = _.chain(authors).toPairs().maxBy(pair => pair[1]).value()
  return biggestAuthor ? {author: biggestAuthor[0], blogs: biggestAuthor[1]} : {}
}

const mostLikes = blogs => {
  // group every author's post as property of author's name as key
  let authors = _.groupBy(blogs, 'author')
  // reduce each group to an object containing author and likes as keys along with their corresponding values
  authors = _.reduce(authors, (result, value, key) => {
    result.push({author: key, likes: _.sumBy(value, object => object.likes)})
    return result
  }, [])
  // return the object with most likes
  return _.maxBy(authors, object => object.likes) || {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}