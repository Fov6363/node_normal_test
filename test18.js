let result = new Buffer('yuan123').toString('base64');
console.log(result);
let str = 'MjhERTEwQkFBRDJBRTRERDhDM0FBNkZBMzNFQ0RFMTFCQTBCQzE3QU1UUTRPRFV6TkRjeU16UTVNRFUyTnpnek9ETXJNVE15T1RRME9EZzROVGsyTVRreU1ETXdNRE0zTnpjd01EazNNekV5T1RJek1qUXlNemN4';
console.log(new Buffer(result).toString('base64'));
console.log(new Buffer(str, 'base64').toString('utf8'));
console.log(new Buffer(new Buffer(str, 'base64').toString('utf8'), 'base64').toString('utf8'));



















//eXVhbjEyMw==