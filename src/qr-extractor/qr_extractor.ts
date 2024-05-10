import puppeteer, {Page} from "puppeteer";
import puppeteerConfig from "../puppeteer.config";


export async function qrExtractor(url: string, fieldsToExtract: string[]) {
    console.log(puppeteerConfig)
    const browser = await puppeteer.launch(puppeteerConfig);
    const page:Page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36")
    await page.goto(url);

    fieldsToExtract.forEach((field) => {
        getValues(field, page)
    })

    //Open specification
    const hrefValue = '#collapse-specs';
    const linkElement = await page.$(`a[href="${hrefValue}"]`);

    if (linkElement) {
        // Click the link if found
        await linkElement.click();
        console.log('Clicked on the link:', );
    } else {
        console.error('Specified link not found.');
    }
    // Wait for a moment for the page to update after the click
    await page.waitForNetworkIdle()

    const cellValues = await page.evaluate(() => {
        const rows = document.querySelectorAll('tbody[data-bind="foreach: Specifications"] tr');
        const values = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td[data-bind], strong[data-bind]');
            const rowValues = [];

            cells.forEach(cell => {
                rowValues.push(cell.textContent.trim());
            });

            if (rowValues.length > 0) {
                values.push(rowValues);
            }
        });

        return values;
    });

    await browser.close();

    return cellValues;
}

// Example usage:
// const url = 'https://suf.purs.gov.rs/v/?vl=A0VGTFBLWVNEUjdXUzVNTzAJCgAAjwkAAHD2KwQAAAAAAAABjuD9SbQAAACNPW9TkDjf5PSFxbzwJjUHKm6o%2FFRYQdgNqWJngisG6P54DGrAKxbKbxSyqrkejL%2FNWsdHJKcQZpJXh9RI5TQd9Hw0gQMwqqRpyaWfuM4H6b6xf4ZgougJUpwlXaSvm79SJjVcjCsVIjrs0VR4F0l1M3%2BI%2F7Pe5dIu7CRxKEILlbwhZgfxZ1GYe2ZKezJHLQaE2NUBPRNRahJFqR10r5A91qWw6r%2BkxiAaxm0XAx8Sle6qIrxeYqnsvTEape3kL%2Blp9rEBlZWHjW5b3bqnwfJC8LRz%2B94CYgYs0CQIw293xP6itkD%2B3cVFwqmBvPUsFJTa7kaMKqOfB5TtF4MQi56PCYki6QGnVkj4X0KD4XHKZZ1ARw81wUO0kuKhL%2FQCr28ZfJRSJFLyXaflstW1aYH0mI9R8hp6gSNioZ%2FOEs7ypT7KXPJBcCeDoYA8Q9KwgD9l%2FB%2FaM6%2F%2FqHNu60chqiekigdYF1ZqkBWV9UlpSIr%2Bhu5eURgxDok6cL%2BhFaJy%2BbwiQWHbM3dJIEjg%2FUbhxnEDLab2avIIo57oSrV99vgcfF%2FCWeKnw9MBoi2fld5z2umi8FyVywOJSdFweWHBQ%2BXJNY3C%2F1EcPX7DVm1V2mOVBwgmIsjFSmJ6X6F3MIW%2F4wdqYXr3wt55Ag%2FQhDf%2FFP1aIuUHw1a3lW8iA8IbRt2qkNJJUWe57GRgCkN99F0cxXY%3D'
// const url2 = 'https://suf.purs.gov.rs/v/?vl=AzlWTUVLTVNOREJWOEdQTzA2FjwASxM8AEBCDwAAAAAAAAABjxpRbD8AAAAoRjk1cDtav%2FKlSwzrhQssXEjOfkqzH6hpmh9zYRVXvhkhD6ukvvO8oibiza7eK9EA6APXbqCvwevn1%2B9ZhozeVLlza3cCMfGG3qE5DBhU9%2FqWMa4kz2oK9HvGg33QVnfqrhO7TC26qKFi%2BCpmfjwwrq37x%2Fl%2FxsnRh71QrXkf2XlBQ5RX68brZTOvAKqn7L27FajTemGox5MUqxZPOlsgTKKBPhmccfTQSb0lxFqB%2FuyjVwJJtb0KHx%2FyMk53%2F53wXE90VvvmsBTtSQFL30G5kEgXhCICx4yEGnqaRux81kXlExmeZzbgIp7UjrruiBpXWAvkUZnbGxpcvggXBFRkuA9%2FfQS01QMKmvfO8RSM%2F6YMqMarjYjbMhanbg%2FxYJ%2Bsc2VHLYj21XXgYkFWTX7789VNgEO24adz5VN2%2FkBGvXx%2BfhDpsY1btscYZSV%2BH%2FDkNxXZmmdAYjkF2aCQSN9oXBTZZJlZG2RpXrUAMwM8yUAIChDruDQgKT3pRvGdE%2FwVU1F%2BNI1L4GPCy5MSX7tCjq1TdfAOE2BpsMsQBfGRRnif%2Bapx7WfpJaLGx7TpA3EnGgM1qqMXwNSys%2F%2FzOpIXpqgA%2FPdA2p0CkKLmZPySJbpkVN%2FqQsuDxid7zuiTWYN%2FZXITThN%2BlSRCBunOBJ%2BgFMZ4sg4UD83RZLrZ6a1feXz6tWt9X4oox2MB%2FhQ3CXM%3D'
// const fields = ['shopFullNameLabel','totalAmountLabel','sdcDateTimeLabel']
//
// qrExtractor(url2, fields).then(values => {
//     console.log('Cell Values:');
//     values.forEach(row => {
//         console.log('new');
//         console.log(row.join('\t'));
//     });
// }).catch(err => {
//     console.error('Error:', err);
// });

const getValues = async (fieldName: string, page: Page) => {
    const elementName = await page.$(`#${fieldName}`)
    const elementValue = await elementName?.evaluate(node => node.textContent.trim());
    console.log(fieldName, elementValue)
    return elementValue || undefined;
}