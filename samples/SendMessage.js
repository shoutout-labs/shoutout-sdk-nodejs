/**
 * Created by asankanissanka on 6/16/17.
 */
'use strict';

let ShoutoutClient = require('./../sdks/ShoutoutClient');

let apiKey = 'XXXXXXXXX.XXXXXXXXX.XXXXXXXXX';

let debug = true, verifySSL = false;

let client = new ShoutoutClient(apiKey, debug, verifySSL);

let message = {
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
