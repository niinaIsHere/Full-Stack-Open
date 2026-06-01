const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Niina',
        username: 'niinak',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameField = page.getByLabel('username')
    const passwordField = page.getByLabel('password')
    await expect(usernameField).toBeVisible()
    await expect(passwordField).toBeVisible()
  })

  describe('Login', () => {
  test('succeeds with correct credentials', async ({ page }) => {
    const usernameField = page.getByLabel('username')
    await usernameField.fill('niinak')
    const passwordField = page.getByLabel('password')
    await passwordField.fill('salainen')
    const loginButton = page.getByRole('button', { name: 'login' })
    await loginButton.click()
    await expect(page.getByText('logout')).toBeVisible()
    await expect(page.getByText('Niina logged in')).toBeVisible()
  })

  test('fails with wrong credentials', async ({ page }) => {
    const usernameField = page.getByLabel('username')
    await usernameField.fill('niinak')
    const passwordField = page.getByLabel('password')
    await passwordField.fill('wrong')
    const loginButton = page.getByRole('button', { name: 'login' })
    await loginButton.click()
    await expect(page.getByText('wrong credentials')).toBeVisible()
    await expect(page.getByText('logout')).not.toBeVisible()
  })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      const usernameField = page.getByLabel('username')
      await usernameField.fill('niinak')
      const passwordField = page.getByLabel('password')
      await passwordField.fill('salainen')
      const loginButton = page.getByRole('button', { name: 'login' })
      await loginButton.click()
    })

    test('a new blog can be created', async ({ page }) => {
      const addBlogButton = page.getByRole('button', { name: 'new blog' })
      await addBlogButton.click()

      const titleField = page.getByLabel('title')
      await titleField.fill('test title')
      const authorField = page.getByLabel('author')
      await authorField.fill('test author')
      const urlField = page.getByLabel('url')
      await urlField.fill('test url')

      const createButton = page.getByRole('button', { name: 'create' })
      await createButton.click()

      await expect(page.getByText('test title test author')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      const addBlogButton = page.getByRole('button', { name: 'new blog' })
      await addBlogButton.click()

      const titleField = page.getByLabel('title')
      await titleField.fill('test title')
      const authorField = page.getByLabel('author')
      await authorField.fill('test author')
      const urlField = page.getByLabel('url')
      await urlField.fill('test url')

      const createButton = page.getByRole('button', { name: 'create' })
      await createButton.click()

      const viewButton = page.getByRole('button', { name: 'view' })
      await viewButton.click()
      const likeButton = page.getByRole('button', { name: 'like' })
      await likeButton.click()

      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be removed', async ({ page }) => {
      const addBlogButton = page.getByRole('button', { name: 'new blog' })
      await addBlogButton.click()

      const titleField = page.getByLabel('title')
      await titleField.fill('test title')
      const authorField = page.getByLabel('author')
      await authorField.fill('test author')
      const urlField = page.getByLabel('url')
      await urlField.fill('test url')

      const createButton = page.getByRole('button', { name: 'create' })
      await createButton.click()

      const viewButton = page.getByRole('button', { name: 'view' })
      await viewButton.click()
      const removeButton = page.getByRole('button', { name: 'remove' })

      await page.evaluate(() => {
        window.confirm = () => true
      })

      await removeButton.click()

      await expect(page.getByText('test title test author')).not.toBeVisible()
    })

    test('only the blog creator sees remove button', async ({ page, request }) => {
      await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Viltsu',
        username: 'violak',
        password: 'salainen'
      }
      })

      await page.goto('http://localhost:5173')

      const usernameField = page.getByLabel('username')
      await usernameField.fill('niinak')
      const passwordField = page.getByLabel('password')
      await passwordField.fill('salainen')
      const loginButton = page.getByRole('button', { name: 'login' })
      await loginButton.click()

      const addBlogButton = page.getByRole('button', { name: 'new blog' })
      await addBlogButton.click()

      const titleField = page.getByLabel('title')
      await titleField.fill('test title')
      const authorField = page.getByLabel('author')
      await authorField.fill('test author')
      const urlField = page.getByLabel('url')
      await urlField.fill('test url')

      const createButton = page.getByRole('button', { name: 'create' })
      await createButton.click()

      const viewButton = page.getByRole('button', { name: 'view' })
      await viewButton.click()
      const removeButton = page.getByRole('button', { name: 'remove' })

      await expect(removeButton).toBeVisible()

      const hideButton = page.getByRole('button', { name: 'hide' })
      await hideButton.click()

      const logoutButton = page.getByRole('button', { name: 'logout' })
      await logoutButton.click()

      const viewButtonNoUser = page.getByRole('button', { name: 'view' })
      await viewButtonNoUser.click()
      await expect(removeButton).not.toBeVisible()
      const hideButtonNoUser = page.getByRole('button', { name: 'hide' })
      await hideButtonNoUser.click()

      const usernameFieldScnd = page.getByLabel('username')
      await usernameFieldScnd.fill('violak')
      const passwordFieldScnd = page.getByLabel('password')
      await passwordFieldScnd.fill('salainen')
      const loginButtonScnd = page.getByRole('button', { name: 'login' })
      await loginButtonScnd.click()

      const viewButtonNextUser = page.getByRole('button', { name: 'view' })
      await viewButtonNextUser.click()
      await expect(removeButton).not.toBeVisible()
    })
  
    test('blogs are sorted in order of likes', async ({ page }) => {
      const addBlogButton = page.getByRole('button', { name: 'new blog' })
      await addBlogButton.click()

      const titleField = page.getByLabel('title')
      await titleField.fill('test title')
      const authorField = page.getByLabel('author')
      await authorField.fill('test author')
      const urlField = page.getByLabel('url')
      await urlField.fill('test url')

      const createButton = page.getByRole('button', { name: 'create' })
      await createButton.click()

      const addBlogButtonScnd = page.getByRole('button', { name: 'new blog' })
      await addBlogButtonScnd.click()

      const titleFieldScnd = page.getByLabel('title')
      await titleFieldScnd.fill('second title')
      const authorFieldScnd = page.getByLabel('author')
      await authorFieldScnd.fill('second author')
      const urlFieldScnd = page.getByLabel('url')
      await urlFieldScnd.fill('second url')

      const createButtonScnd = page.getByRole('button', { name: 'create' })
      await createButtonScnd.click()

      const firstBlog = page.locator('.blog', { hasText: 'test title' })
      const lastBlog = page.locator('.blog', { hasText: 'second title second author' })
      await expect(firstBlog).toContainText('test title test author')

      const viewButton = (lastBlog).getByRole('button', { name: 'view' })
      await viewButton.click()

      await (lastBlog).getByRole('button', { name: 'like' }).click()

      const blogs = page.locator('.blog')
      await expect(blogs.first()).toContainText('second title second author')
    })
  })
})

