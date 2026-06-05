import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

test.skip('correct visibility before view', () => {
  const blog = {
    title: 'Blog to test',
    author: 'The Author',
    url: 'w.blog.f',
    likes: 4,
    user: { username: 'testguy' }
  }

  render(<Blog blog={blog} />)

  const title = screen.findByText('Blog to test')
  const author = screen.findByText('The Author')
  const url = screen.queryByText('w.blog.f')
  const likes = screen.queryByText('likes 4')
  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
})

test.skip('correct visibility after view', async () => {
  const blog = {
    title: 'Blog to test',
    author: 'The Author',
    url: 'w.blog.f',
    likes: 4,
    user: { username: 'testguy' }
  }

  render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('w.blog.f')
  const likes = screen.getByText('likes 4')
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test.skip('clicking like twice calls handler twice', async () => {
  const blog = {
    title: 'Blog to test',
    author: 'The Author',
    url: 'w.blog.f',
    likes: 4,
    user: { username: 'testguy' }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler}/>)
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('correct visibility when logged in and creator', async () => {
  const blog = {
    title: 'Blog to test',
    author: 'The Author',
    url: 'w.blog.f',
    likes: 4,
    user: { id: '123', username: 'testguy' }
  }
  const user = {
    id: '123',
    username: 'testguy'
  }
  render(<Blog blog={blog} loggedInUser={user}/>)

  const likeButton = screen.getByRole('button', { name: 'like' })
  expect(likeButton).toBeDefined()
  const removeButton = screen.getByRole('button', { name: 'Remove' })
  expect(removeButton).toBeDefined()
})

test('correct visibility when logged in and not creator', async () => {
  const blog = {
    title: 'Blog to test',
    author: 'The Author',
    url: 'w.blog.f',
    likes: 4,
    user: { id: '123', username: 'testguy' }
  }
  const user = {
    id: '234',
    username: 'testgirl'
  }
  render(<Blog blog={blog} loggedInUser={user}/>)

  const likeButton = screen.getByRole('button', { name: 'like' })
  expect(likeButton).toBeDefined()
  const removeButton = screen.queryByRole('button', { name: 'Remove' })
  expect(removeButton).toBeNull()
})

test('correct visibility when not logged in', async () => {
  const blog = {
    title: 'Blog to test',
    author: 'The Author',
    url: 'w.blog.f',
    likes: 4,
    user: { id: '123', username: 'testguy' }
  }
  render(<Blog blog={blog} loggedInUser={null}/>)

  const likeButton = screen.queryByRole('button', { name: 'like' })
  expect(likeButton).toBeNull()
  const removeButton = screen.queryByRole('button', { name: 'Remove' })
  expect(removeButton).toBeNull()
  const titleText = screen.getByText('The Author: Blog to test')
  expect(titleText).toBeVisible()
  const urlText = screen.getByText('w.blog.f')
  expect(urlText).toBeVisible()
  const likesText = screen.getByText('likes 4')
  expect(likesText).toBeVisible()
})
