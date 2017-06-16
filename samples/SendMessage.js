/**
 * Created by asankanissanka on 6/16/17.
 */

var ShoutoutClient = require('./../sdks/ShoutoutClient');

var apiKey = 'XXXXXXXXX.XXXXXXXXX.XXXXXXXXX';

var debug = true, verifySSL = false;

var client = new ShoutoutClient(apiKey, debug, verifySSL);

var message = {
    source: 'ShoutDEMO',
    destinations: ['94777123456'],
    content: {
        sms: 'Sent via SMS Gateway'
    },
    transports: ['sms']
};

client.sendMessage(message, (error, result) => {
    if (error) {
        console.error('error ', error);
    } else {
        console.log('result ', result);
    }
});
