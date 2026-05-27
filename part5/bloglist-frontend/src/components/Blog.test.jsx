import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

test('correct visibility before view', () => {
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

test('correct visibility after view', async () => {
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
