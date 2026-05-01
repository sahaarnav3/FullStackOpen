const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const data = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(data)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request?.token, process.env.SECRET)
  if(!decodedToken.id)
    return response.status(401).json({ error: 'Token invalid' })

  const user = request.user

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async(request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id)
    return response.status(401).json({ error: 'Token invalid' })
  const user = request.user

  const blog = await Blog.findById(request.params.id).populate('user')
  if(!blog)
    return response.status(401).json({ error: 'Blog doesn\'t exist' })
  if(!(blog.user._id.toString() === decodedToken.id.toString()))
    return response.status(401).json({ error: 'Invalid user' })
  user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
  await user.save()
  await blog.deleteOne()
  return response.status(204).end()
})

blogRouter.put('/:id', async(req, res) => {
  const { likes } = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes: likes },
    { returnDocument: 'after' }
  )
  if(updatedBlog)
    return res.json(updatedBlog)
})

module.exports = blogRouter