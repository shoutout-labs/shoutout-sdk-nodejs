var ShoutoutClient = require('./../sdks/ShoutoutClient');

var apiKey = 'XXXXXXXXX.XXXXXXXXX.XXXXXXXXX';

var debug = true, verifySSL = false;

var client = new ShoutoutClient(apiKey, debug, verifySSL);

var otpRequest = {
    source: 'ShoutDEMO',
    destination: '94777123456',
    content: {
        sms: 'Your verification code is {{code}}'
    },
    transport: 'sms'
};

client.sendOtp(otpRequest, (error, result) => {
    if (error) {
        console.error('error ', error);
    } else {
        console.log('result ', result);
        // result.referenceId is required to verify the OTP later
    }
});
