const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const data = await Blog.find({})
  response.json(data)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async(req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  return res.status(204).end()
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