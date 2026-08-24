var ShoutoutClient = require('./../sdks/ShoutoutClient');

var apiKey = 'XXXXXXXXX.XXXXXXXXX.XXXXXXXXX';

var debug = true, verifySSL = false;

var client = new ShoutoutClient(apiKey, debug, verifySSL);

var verifyRequest = {
    code: '12345',
    referenceId: 'a3f1c2b4-9e87-4c3a-b1f2-9e8d7c6b5a4e'
};

client.verifyOtp(verifyRequest, (error, result) => {
    if (error) {
        console.error('error ', error);
    } else {
        console.log('result ', result);
        // result.valid indicates whether the code was correct
    }
});
