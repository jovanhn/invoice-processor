// Sample Integration Test in Express.js
// import chai from 'chai';


import {invoices} from "./mock/invoice-urls";
import supertest from "supertest";
import app from "../app";

describe('Invoice Processor', () => {
    beforeEach((): void => {
        jest.setTimeout(60000);
    })
    it('should process invoice', async () => {
        const response =
            await supertest(app)
                .post('/process')
                .send({url: invoices[0].url})

        console.log(response.body)
        expect(response.status).toBe(200)
    })

    it('should process invoice', async () => {
        const response =
            await supertest(app)
                .get('/')

        console.log(response.body)
        expect(response.status).toBe(200)
    })
})
