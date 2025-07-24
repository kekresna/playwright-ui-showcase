import { test, expect, request } from '@playwright/test';
import { Env } from '../../env';

test("Success Login 200", async ({ request }) => {
    let body = {
        "email": "alvinkresna@gmail.com",
        "password": "123456"
    }
    const response = await request.post(`${Env.BASE_URL}${Env.API_LOGIN}`, {
        data: body
    })
    expect(response).toBeTruthy()
    expect(response.status()).toEqual(200)
})

test("Failed Login 400", async ({ request }) => {
    let body = {
        "email": "alvinkresna@gmail.com",
        "password": "12345678"
    }
    const response = await request.post(`${Env.BASE_URL}${Env.API_LOGIN}`, {
        data: body
    })
    expect(response).toBeTruthy()
    expect(response.status()).toEqual(400)
})

test("Add Items to Cart", async ({ request }) => {
    let body = {
        "sku": "NJC15709-Blue-XL",
        "qty": "1"
    }

    let headers = {
        Cookie: "sid=s%3A1UiyIzOduX5uzCUBCi-KA-K8I2WuxsoG.Xng4%2BcmSm5FtFwPdC9jkvRBbyMLKzHpMtkXn7PRZSmw"
    }
    const response = await request.post(`${Env.BASE_URL}${Env.API_CART_ITEMS}`, {
        headers: headers,
        data: body
    })
    expect(response).toBeTruthy()
    expect(response.status()).toEqual(200)
})