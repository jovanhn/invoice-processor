import axios from "axios";
import * as cheerio from 'cheerio';

interface Data {
    data: any
}

const url = "https://suf.purs.gov.rs/v/?vl=AzlWTUVLTVNOREJWOEdQTzA2FjwASxM8AEBCDwAAAAAAAAABjxpRbD8AAAAoRjk1cDtav%2FKlSwzrhQssXEjOfkqzH6hpmh9zYRVXvhkhD6ukvvO8oibiza7eK9EA6APXbqCvwevn1%2B9ZhozeVLlza3cCMfGG3qE5DBhU9%2FqWMa4kz2oK9HvGg33QVnfqrhO7TC26qKFi%2BCpmfjwwrq37x%2Fl%2FxsnRh71QrXkf2XlBQ5RX68brZTOvAKqn7L27FajTemGox5MUqxZPOlsgTKKBPhmccfTQSb0lxFqB%2FuyjVwJJtb0KHx%2FyMk53%2F53wXE90VvvmsBTtSQFL30G5kEgXhCICx4yEGnqaRux81kXlExmeZzbgIp7UjrruiBpXWAvkUZnbGxpcvggXBFRkuA9%2FfQS01QMKmvfO8RSM%2F6YMqMarjYjbMhanbg%2FxYJ%2Bsc2VHLYj21XXgYkFWTX7789VNgEO24adz5VN2%2FkBGvXx%2BfhDpsY1btscYZSV%2BH%2FDkNxXZmmdAYjkF2aCQSN9oXBTZZJlZG2RpXrUAMwM8yUAIChDruDQgKT3pRvGdE%2FwVU1F%2BNI1L4GPCy5MSX7tCjq1TdfAOE2BpsMsQBfGRRnif%2Bapx7WfpJaLGx7TpA3EnGgM1qqMXwNSys%2F%2FzOpIXpqgA%2FPdA2p0CkKLmZPySJbpkVN%2FqQsuDxid7zuiTWYN%2FZXITThN%2BlSRCBunOBJ%2BgFMZ4sg4UD83RZLrZ6a1feXz6tWt9X4oox2MB%2FhQ3CXM%3D"
export const qrExtractorHtml = async (): Promise<Data> => {
    console.log("qrExtractorHtml");
    console.time();

    try {
        const html = await extractHTML();
        const $ = cheerio.load(html.data);
        const divElement = $('div[style="width:100%;margin-top: 30px"][data-bind="if: Specifications().length > 0"]');
        const extractedText = divElement.text().trim();

        console.timeEnd("Execution time for processing");
        return {data: extractedText} // Replace 0 with the actual time taken if needed

    } catch (e) {
        console.error(e);
        throw e;
    }
}

const extractHTML = async (): Promise<Data> => {
    console.log("qrExtractorHtml");
    try {
        const response = await axios.get(url).then((res) => res.data);

        console.log("qrExtractorHtml:", response);
        return {data: response}
    } catch (e) {
        console.error(e);
        throw e;
    }
}

