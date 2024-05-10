"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrExtractor = void 0;
var puppeteer_1 = require("puppeteer");
function qrExtractor(url, fieldsToExtract) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, hrefValue, linkElement, cellValues;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_1.default.launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(url)];
                case 3:
                    _a.sent();
                    fieldsToExtract.forEach(function (field) {
                        getValues(field, page);
                    });
                    hrefValue = '#collapse-specs';
                    return [4 /*yield*/, page.$("a[href=\"".concat(hrefValue, "\"]"))];
                case 4:
                    linkElement = _a.sent();
                    if (!linkElement) return [3 /*break*/, 6];
                    // Click the link if found
                    return [4 /*yield*/, linkElement.click()];
                case 5:
                    // Click the link if found
                    _a.sent();
                    console.log('Clicked on the link:');
                    return [3 /*break*/, 7];
                case 6:
                    console.error('Specified link not found.');
                    _a.label = 7;
                case 7: 
                // Wait for a moment for the page to update after the click
                return [4 /*yield*/, page.waitForNetworkIdle()];
                case 8:
                    // Wait for a moment for the page to update after the click
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var rows = document.querySelectorAll('tbody[data-bind="foreach: Specifications"] tr');
                            var values = [];
                            rows.forEach(function (row) {
                                var cells = row.querySelectorAll('td[data-bind], strong[data-bind]');
                                var rowValues = [];
                                cells.forEach(function (cell) {
                                    rowValues.push(cell.textContent.trim());
                                });
                                if (rowValues.length > 0) {
                                    values.push(rowValues);
                                }
                            });
                            return values;
                        })];
                case 9:
                    cellValues = _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 10:
                    _a.sent();
                    return [2 /*return*/, cellValues];
            }
        });
    });
}
exports.qrExtractor = qrExtractor;
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
var getValues = function (fieldName, page) { return __awaiter(void 0, void 0, void 0, function () {
    var elementName, elementValue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.$("#".concat(fieldName))];
            case 1:
                elementName = _a.sent();
                return [4 /*yield*/, (elementName === null || elementName === void 0 ? void 0 : elementName.evaluate(function (node) { return node.textContent.trim(); }))];
            case 2:
                elementValue = _a.sent();
                console.log(fieldName, elementValue);
                return [2 /*return*/, elementValue || undefined];
        }
    });
}); };
