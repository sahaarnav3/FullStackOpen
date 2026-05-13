const { test, expect, beforeEach, describe } = require('@playwright/test')

test.describe.configure({ mode: 'serial' }) //to run tests one after another and not parallely 

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

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.goto('/login')
            await page.locator('input[type=text]').fill('sahaarnav')
            await page.locator('input[type=password]').fill('pass123')
            await page.getByRole('button', { name: 'Login' }).click()

            await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.goto('/login')
            await page.locator('input[type=text]').fill('sahaarnav')
            await page.locator('input[type=password]').fill('wrongpass')
            await page.getByRole('button', { name: 'Login' }).click()

            const errorDiv = page.locator('.error')
            await expect(errorDiv).toContainText('Wrong username or password')
            await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()

        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.goto('/login')
            await page.locator('input[type=text]').fill('sahaarnav')
            await page.locator('input[type=password]').fill('pass123')
            await page.getByRole('button', { name: 'Login' }).click()

            await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
        })

        test('a new blog can be created', async ({ page }) => {
            await page.goto('/create')
            await page.getByLabel('title:').fill('Playwright is cool')
            await page.getByLabel('author').fill('Test Bot')
            await page.getByLabel('url').fill('http://playwright.dev')

            await page.getByRole('button', { name: 'Create' }).click()
            await expect(page.locator('.success')).toContainText('a new blog Playwright is cool added')
        })

        test('a blog can be liked', async ({ page }) => {
            await page.goto('/create')
            await page.getByLabel('title:').fill('Testing Likes')
            await page.getByLabel('author').fill('Test Bot')
            await page.getByLabel('url').fill('http://test.com')
            await page.getByRole('button', { name: 'Create' }).click()
            await expect(page.locator('.success')).toContainText('a new blog Testing Likes added')

            await page.goto('/')
            await expect(page.getByText('Testing Likes Test Bot')).toBeVisible()
            const blogElement = page.getByText('Testing Likes Test Bot').locator('..')
            await blogElement.getByRole('button', { name: 'view' }).click()
            await page.waitForURL(/\/blog-details\/.+/)

            await expect(page.getByText('likes 0')).toBeVisible()
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByText('likes 1')).toBeVisible()
            await expect(page.locator('.success')).toContainText('Likes Updated')
        })

        test('a blog can be deleted by the user who created it', async ({ page }) => {
            await page.goto('/create')
            await page.getByLabel('title:').fill('Blog to be deleted')
            await page.getByLabel('author:').fill('Delete Bot')
            await page.getByLabel('url:').fill('http://delete.me')
            await page.getByRole('button', { name: 'Create' }).click()
            await expect(page.locator('.success')).toContainText('a new blog Blog to be deleted added')

            await page.goto('/')
            await expect(page.getByText('Blog to be deleted Delete Bot')).toBeVisible()
            const blogElement = page.getByText('Blog to be deleted Delete Bot').locator('..')
            await blogElement.getByRole('button', { name: 'view' }).click()
            await page.waitForURL(/\/blog-details\/.+/)

            await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
            
            
            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toContain('Remove blog Blog to be deleted by Delete Bot')
                await dialog.accept();
            })
            await page.getByRole('button', { name: 'remove' }).click()

            await expect(page.getByText('Blog to be deleted Delete Bot')).not.toBeVisible()
            await expect(page.locator('.success')).toContainText('Blog Deleted')
        })
    })
})