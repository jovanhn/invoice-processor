// Sample Integration Test in Express.js
// import chai from 'chai';



import {invoices} from "./mock/invoice-urls";

test('sample test', () => {
    console.log(invoices[0])
    expect(true).toBe(true)
})