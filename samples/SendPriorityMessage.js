var ShoutoutClient = require('./../sdks/ShoutoutClient');

var apiKey = 'XXXXXXXXX.XXXXXXXXX.XXXXXXXXX';

var debug = true, verifySSL = false;

var client = new ShoutoutClient(apiKey, debug, verifySSL);

var message = {
    source: 'ShoutDEMO',
    destinations: ['94777123456'],
    content: {
        sms: 'Your OTP-adjacent time-sensitive alert'
    },
    transports: ['sms'],
    priority: 1
};

client.sendPriorityMessage(message, (error, result) => {
    if (error) {
        console.error('error ', error);
    } else {
        console.log('result ', result);
    }
});
