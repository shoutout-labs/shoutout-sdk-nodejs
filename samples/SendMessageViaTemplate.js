var ShoutoutClient = require('./../sdks/ShoutoutClient');

var apiKey = 'XXXXXXXXX.XXXXXXXXX.XXXXXXXXX';

var debug = true, verifySSL = false;

var client = new ShoutoutClient(apiKey, debug, verifySSL);

var message = {
    source: 'ShoutDEMO',
    destinations: ['94777123456'],
    templateId: '8a3c1f2b-4d9e-4c3a-b1f2-9e8d7c6b5a4e',
    customAttributes: {
        name: 'Kasun',
        order_id: 'ORD-4821'
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
