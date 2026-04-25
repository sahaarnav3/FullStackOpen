const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async() => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async() => {
  const response = await api.get('/api/blogs')
  assert.ok('id' in response.body[0], 'Response body should contain "id" key')
  assert.strictEqual('_id' in response.body[0], false, 'Expected "_id" to be removed')
})

test('a valid blog can be added', async() => {
  const newBlog = helper.newBlog
  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes('Type wars'))
})

test('missing like property will default to zero', async() => {
  const blogWithoutLike = helper.blogWithoutLike
  const response = await api.post('/api/blogs').send(blogWithoutLike).expect(201).expect('Content-Type', /application\/json/)
  assert(Object.keys(response.body).includes('likes'))
  assert.strictEqual(response.body.likes, 0)
})

test('checking bad request if title or url is missing', async() => {
  const blogWithoutTitle = helper.blogWithoutTitle
  const blogWithoutUrl = helper.blogWithoutUrl
  await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
  await api.post('/api/blogs').send(blogWithoutUrl).expect(400)
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

describe('deletion of a blog', () => {
  test('succeed with status code 204 if id is valid', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(blog => blog.title)
    assert(!contents.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
})

describe('updation of a blog', () => {
  test('succeed with status code 200 if format is valid', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const newLikesValue = { likes: 27 }
    const updatedBlog = await api
      .put(`/api/blogs/${blogToDelete.id}`)
      .send(newLikesValue)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(updatedBlog.body.likes, newLikesValue.likes)
  })
})


after(async () => {
  await mongoose.connection.close()
})