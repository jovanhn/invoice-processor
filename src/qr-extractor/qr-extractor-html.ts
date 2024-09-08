import axios from "axios";
import * as cheerio from 'cheerio';
import {Invoice} from "../model/enteties";
import {formatDateTime} from "../util/date-formatter";

interface Data {
    data: any
}

const fieldsLabelToModelMap =

    {
        'shopFullNameLabel': 'shopFullName',
        'totalAmountLabel': 'totalAmount',
        'sdcDateTimeLabel': 'dateTime',
        'addressLabel': 'address',
        'invoiceNumberLabel': 'invoiceNumber'
    }


export const qrExtractorHtml = async (url: string, fieldsToExtract) => {
    console.log("qrExtractorHtml started");
    console.time("Simple processing");

    try {
        const html = await extractHTML(url);
        const cheerioData = cheerio.load(html.data);
        const divElement = cheerioData('div[style="width:100%;margin-top: 30px"][data-bind="if: Specifications().length > 0"]');
        const extractedText = divElement.text().trim();

        const invoice: Invoice = {
            id: '',
            totalAmount: 0,
            dateTime: '',
            shopFullName: '',
            address: '',
            invoiceNumber: '',
            currency: 'RSD',
            type: 'QR',
            items: []
        }
        fieldsToExtract.forEach((field: string) => {
            invoice[fieldsLabelToModelMap[field]] = extractFiledValue(field, cheerioData)

        })

        console.timeEnd("Simple processing");
        return {...invoice, dateTime: formatDateTime(invoice.dateTime)};

    } catch (e) {
        console.error(e);
        throw e;
    }
}

const extractHTML = async (url: string): Promise<Data> => {
    try {
        const response = await axios.get(url).then((res) => res.data);
        return {data: response}

    } catch (e) {
        console.error(e);
        throw e;
    }
}

const extractFiledValue = (fieldName: string, cheerioData: any) => {
    try {
        return cheerioData(`#${fieldName}`).text().trim()
    } catch (error) {
        console.error(`Unable to extract field: ${fieldName} `, error);
    }
    return ""
}

