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
})