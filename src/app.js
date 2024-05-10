"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var qr_extractor_1 = require("./qr-extractor/qr_extractor");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.json());
app.post('/process', function (req, res) {
    var requestData = req.body;
    var responseData = { message: 'Processed successfully', data: requestData };
    var url2 = 'https://suf.purs.gov.rs/v/?vl=AzlWTUVLTVNOREJWOEdQTzA2FjwASxM8AEBCDwAAAAAAAAABjxpRbD8AAAAoRjk1cDtav%2FKlSwzrhQssXEjOfkqzH6hpmh9zYRVXvhkhD6ukvvO8oibiza7eK9EA6APXbqCvwevn1%2B9ZhozeVLlza3cCMfGG3qE5DBhU9%2FqWMa4kz2oK9HvGg33QVnfqrhO7TC26qKFi%2BCpmfjwwrq37x%2Fl%2FxsnRh71QrXkf2XlBQ5RX68brZTOvAKqn7L27FajTemGox5MUqxZPOlsgTKKBPhmccfTQSb0lxFqB%2FuyjVwJJtb0KHx%2FyMk53%2F53wXE90VvvmsBTtSQFL30G5kEgXhCICx4yEGnqaRux81kXlExmeZzbgIp7UjrruiBpXWAvkUZnbGxpcvggXBFRkuA9%2FfQS01QMKmvfO8RSM%2F6YMqMarjYjbMhanbg%2FxYJ%2Bsc2VHLYj21XXgYkFWTX7789VNgEO24adz5VN2%2FkBGvXx%2BfhDpsY1btscYZSV%2BH%2FDkNxXZmmdAYjkF2aCQSN9oXBTZZJlZG2RpXrUAMwM8yUAIChDruDQgKT3pRvGdE%2FwVU1F%2BNI1L4GPCy5MSX7tCjq1TdfAOE2BpsMsQBfGRRnif%2Bapx7WfpJaLGx7TpA3EnGgM1qqMXwNSys%2F%2FzOpIXpqgA%2FPdA2p0CkKLmZPySJbpkVN%2FqQsuDxid7zuiTWYN%2FZXITThN%2BlSRCBunOBJ%2BgFMZ4sg4UD83RZLrZ6a1feXz6tWt9X4oox2MB%2FhQ3CXM%3D';
    var fields = ['shopFullNameLabel', 'totalAmountLabel', 'sdcDateTimeLabel'];
    console.log('New');
    (0, qr_extractor_1.qrExtractor)(url2, fields).then(function (values) {
        console.log('Cell Values:');
        values.forEach(function (row) {
            console.log('new');
            console.log(row.join('\t'));
        });
        res.json(values);
    }).catch(function (err) {
        console.error('Error:', err);
        res.json(err);
    });
});
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
