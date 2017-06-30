/**
 * Created by yuanyuan on 17/3/19.
 */

const crypto = require('crypto');

var data ={"appid":"301074772","waresid":1,"cporderid":"123412zxcvzasdfqwesdfdsrasdghj","price":0.01,"currency":"RMB","appuserid":"10123059","cpprivateinfo":"11qwe123r23q232111"}

const key = "MIICXgIBAAKBgQDZjpotEmPKwRPKeqb6kqLgmiJkmUQ6EgMAlHBLCAdykb8mAKNWPFs+uyyknOAg+kqQzS9oEoF1P2YYDzYLVQeU4x2c9PtLPMxhXOqdiS6tdJ7RBa2SS4z0WaPmjGAds8qvVnec8Kp5/UXpIDXHRfJ7vNCwNB5O1BEJO/uIRMNIOwIDAQABAoGBAM/HCOpo+NPIyN0FfPotF8/IhXZshqOrViC0o/aU6X/7QILL8zNGG6Ly4nUouknkoVhgDpmnqupOrXPm+yehgsVljoeYRDVEmoyPvFNm+lbv5iDsnHlOohkyEdIO8tMYX7FT269YjWd7PGV1cnHqYUUAq0ncxbu2/RbPbXXsWcAJAkEA83tyOnvKMm46wEaLYXbUzS2iWCv+X0/4h5IKU9q9D2kYhApGaPIOWKf7qtLigkwvSwZ6ZU4kPKcmM817WR64vwJBAOS98iTBD6tYMe6U0Y5E1rO/sQQrIpMwJ2Y6PJQ/uU8z6rXsbEztUR/pbEExkf2a0xCByRxPEwrIRgzBat2Q84UCQHvAvLhY/tZPDHF56ZHqMhLvJNqn0axkGy/c3H7uaLWSdzF1f4ALt5r8FoAmm5YaXtdFPaSL6QMi+dnOkOklIkUCQQCFt0AhGjb1vCXcSWTDHRzBkRKC1FBu6JxvlyWoqCPE2B2h4aZhxe1BkWu2JKsqLGKr6KLPCK6iA/dnJ344La8dAkEA71Mz9WB4fhhU3e284lM1Y6ybS+F5a04racip9NbRAp9bnaDXDBO/EeFM4JZtb48IgnIJ0hfe09y+MDFgw4tgFA==";

function abc() {
    data = JSON.stringify(data);
    var p_key = '-----BEGIN RSA PRIVATE KEY-----\n';
    var strLength = Math.ceil(key.length / 64);
    for (var i = 0; i < strLength; i++) {
        var temp = key.substr(64 * i, 64);
        p_key += temp + '\n';
    }
    p_key += "-----END RSA PRIVATE KEY-----";
console.log(p_key);
    var sign = crypto.createSign('RSA-SHA256'); // 这里SHA1和SHA256都试了一直不对
    var b = new Buffer(data);
    sign.update(b);
    return sign.sign(p_key, 'base64');
};
console.log(abc());