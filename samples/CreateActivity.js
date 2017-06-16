/**
 * Created by asankanissanka on 6/16/17.
 */

var ShoutoutClient = require('./../sdks/ShoutoutClient');

var apiKey = 'XXXXXXXXX.XXXXXXXXX.XXXXXXXXX';

var debug = true, verifySSL = false;

var client = new ShoutoutClient(apiKey, debug, verifySSL);

var activity = {
    userId: '94777123456',
    activityName: 'Sample Activity',
    activityData: {
        param1: 'val1',
        param2: 'val2',
        param3: 'val3'
    }
};

client.createActivity(activity, (error, result) => {
    if (error) {
        console.error('error ', error);
    } else {
        console.log('result ', result);
    }
});
