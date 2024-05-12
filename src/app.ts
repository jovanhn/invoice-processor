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



app.post('/dummy/process',(req: Request, res: Response) => {
    const r = {
        "id": "",
        "totalAmount": "100,00",
        "dateTime": "26.04.2024. 14:11:34",
        "shopFullName": "1207084-WOLT",
        "address": "БУЛЕВАР ВОЈВОДЕ БОЈОВИЋА 8",
        "invoiceNumber": "9VMEKMSN-DBV8GPO0-3937846",
        "currency": "RSD",
        "type": "QR",
        "items": [
            {
                "id": "7d627823-a9ac-45fc-a7ad-b0670a299180",
                "name": "DELIVERY_ITEM",
                "amount": "1,00",
                "priceWithVat": "0,00",
                "totalPrice": "0,00"
            },
            {
                "id": "f4818370-0e74-44a1-83f7-b344f1cc4b43",
                "name": "Напојница",
                "amount": "1,00",
                "priceWithVat": "100,00",
                "totalPrice": "100,00"
            },
            {
                "id": "c5fc4892-9ea0-46b3-b7b8-cb1e6ed17a42",
                "name": "SERVICE_FEE_ITEM",
                "amount": "1,00",
                "priceWithVat": "0,00",
                "totalPrice": "0,00"
            }
        ]
    }
    res.json(r);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


