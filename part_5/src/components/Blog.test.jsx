
import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: { name: 'Test User' }
  }

  const user = { name: 'Test User' }

  const { container } = render(<Blog blog={blog} user={user} />)

  const element = screen.getByText(/Component testing is done with react-testing-library/i )
  expect(element).toBeDefined()

  const details = container.querySelector('.blog-details')
  expect(details).toBeNull()

  const url = screen.queryByText('http://testurl.com')
  expect(url).toBeNull()

  const likes = screen.queryByText('5')
  expect(likes).toBeNull()
})

test('clicking the view button displays URL and likes', async() => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: { name: 'Test User' }
  }

  const user = { name: 'Test User' }

  const session = userEvent.setup()
  const { container } = render(<Blog blog={blog} user={user} />)

  const button = screen.getByText('view')
  await session.click(button)

  const details = container.querySelector('.blog-details')
  expect(details).not.toBeNull()

  expect(screen.getByText('http://testurl.com')).toBeDefined()
  expect(screen.getByText('5', { exact: false })).toBeDefined()
})

test('if the like button is clicked twice, the event handler is called twice', async() => {
  const blog = {
    title: 'Testing like button clicks',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: { name: 'Test User' }
  }

  const user = { name: 'Test User' }

  const mockHandler = vi.fn()
  const session = userEvent.setup()

  render(
    <Blog blog={blog} user={user} likeHandler={mockHandler} />
  )

  const viewButton = screen.getByText('view')
  await session.click(viewButton)

  const likeButton = screen.getByText('like')

  await session.click(likeButton)
  await session.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})