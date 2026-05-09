const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog App', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                username: 'sahaarnav',
                password: 'pass123',
                name: 'Arnav Saha'
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('log in to application')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.locator('input[type=text]').fill('sahaarnav')
            await page.locator('input[type=password]').fill('pass123')
            await page.getByRole('button', { name: 'Login' }).click()

            await expect(page.getByText('Arnav Saha logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.locator('input[type=text]').fill('sahaarnav')
            await page.locator('input[type=password]').fill('wrongpass')
            await page.getByRole('button', { name: 'Login' }).click()

            const errorDiv = page.locator('.error')
            await expect(errorDiv).toContainText('Wrong username or password')
            await expect(page.getByText('Arnav Saha logged in')).not.toBeVisible()

        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.locator('input[type=text]').fill('sahaarnav')
            await page.locator('input[type=password]').fill('pass123')
            await page.getByRole('button', { name: 'Login' }).click()
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()

            await page.getByLabel('title:').fill('Playwright is cool')
            await page.getByLabel('author').fill('Test Bot')
            await page.getByLabel('url').fill('http://playwright.dev')

            await page.getByRole('button', { name: 'Create' }).click()

            await expect(page.getByText('Playwright is cool Test Bot')).toBeVisible()
            await expect(page.locator('.success')).toContainText('a new blog Playwright is cool added')
        })

        test('a blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()

            await page.getByLabel('title:').fill('Testing Likes')
            await page.getByLabel('author').fill('Test Bot')
            await page.getByLabel('url').fill('http://test.com')
            await page.getByRole('button', { name: 'Create' }).click()

            const blogElement = page.getByText('Testing Likes Test Bot').locator('..')
            await blogElement.getByRole('button', { name: 'view' }).click()

            await expect(blogElement).toContainText('likes 0')

            await blogElement.getByRole('button', { name: 'like' }).click()
            await expect(blogElement).toContainText('likes 1')
            await expect(page.locator('.success')).toContainText('Likes Updated')
        })
    })
})