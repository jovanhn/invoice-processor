import  { Request, Response }  from 'express';
const express = require('express');
const cors = require('cors');
import {qrExtractor} from "./qr-extractor/qr_extractor";
import {qrExtractorHtml} from "./qr-extractor/qr-extractor-html";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

let corsOptions = {
    origin : ['http://localhost:5173','https://*.github.io'],
}

app.use(cors(corsOptions))

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


