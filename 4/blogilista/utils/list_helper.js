const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((a, b) => a + b, 0)
}
const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    return blogs[likes.indexOf(Math.max(...likes))]
}
const mostBlogs = (blogs) => {
    const bloggers = blogs.map(blog => blog.author)
    const mostBlogsAuthor = bloggers.slice().sort((a,b) =>
        bloggers.filter(author => author===a).length
        - bloggers.filter(author => author===b).length
        ).pop()
    const blogCount = bloggers.filter(author => author===mostBlogsAuthor).length
    return {author: mostBlogsAuthor, blogs: blogCount} 
}
const mostLikes = (blogs) => {
    const mostLikedAuthorsBlog = blogs.slice().sort((a,b) =>
        blogs.filter(blog => blog.author===a.author).map(blog => blog.likes).reduce((a, b) => a + b, 0)
        - blogs.filter(blog => blog.author===b.author).map(blog => blog.likes).reduce((a, b) => a + b, 0)
        ).pop()
    const totalLikes = blogs.filter(blog => blog.author===mostLikedAuthorsBlog.author).map(blog => blog.likes).reduce((a, b) => a + b, 0)
    return {author: mostLikedAuthorsBlog.author, totalLikes: totalLikes} 
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }