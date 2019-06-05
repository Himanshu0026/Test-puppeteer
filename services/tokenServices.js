var config = require('../config/config.json');
var text = config.secretKey;
const fs = require('fs');

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
 let iv = Buffer.from(text.iv, 'hex');
 let encryptedText = Buffer.from(text.encryptedData, 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}

//let data = JSON.stringify(encrypt(text));

fs.writeFile('../lib/tokenData.json', encrypt(text), (err) => {
    if (err) throw err;
    console.log('Data written to file');
});

console.log('This is after the write call');

var hw = encrypt(text);
console.log(hw);
console.log(decrypt(hw));
