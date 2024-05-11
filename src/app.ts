import  { Request, Response }  from 'express';
const express = require('express');
import {qrExtractor} from "./qr-extractor/qr_extractor";
import {qrExtractorHtml} from "./qr-extractor/qr-extractor-html";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/process', (req: Request, res: Response) => {
    const fields = ['shopFullNameLabel','totalAmountLabel','sdcDateTimeLabel', 'addressLabel', 'invoiceNumberLabel']

    qrExtractor(req.body.url, fields).then(values => {
        res.json(values);
    }).catch(err => {
        console.error('Error:', err);
        res.json(err);
    });

});

app.get("/", (req: Request, res: Response) => {
    res.json({"message": "QR Code processor!"});
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


