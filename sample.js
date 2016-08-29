/**
 * Created by asankanissanka on 8/29/16.
 */
var ShoutOUT = require('./sdks/shoutOUT');

var shoutout = new ShoutOUT();

shoutout.configureGlobalOAuth2Token('API_KEY');

/* Create or Update Contact */

var contact = {
    user_id: {'s': 'UID001'}, // use mobile number, email or your own unique id
    mobile_number: {'s': '94771234567'},
    name: {'s': 'Saman'},
    email: {'s': 'saman@test.com'}
};
shoutout.postContacts(contact, {}, function (err, result, response) {
    if (err) {
        console.error('Error creating shoutout contact!');
    } else {
        console.info('Creating shoutout contact successful!');
    }
});

/* Track Activity */

var activity = {
    user_id: 'UID001',
    activity_name: 'Sample Activity',
    activity_data: {
        param_1: 'param 1',
        param_2: 'param 2',
        param_3: 'param 3'
    }
};
shoutout.postActivitiesRecords(activity, {}, function (err, result, response) {
    if (err) {
        console.error('Error creating activity!');
    } else {
        console.info('Creating activity successful!');
    }
});

/* Send Message */

var message = {
    "content": {"sms": "Testing SMS Gateway"},
    "destinations": ["94771234567"],
    "source": "ShoutDEMO",
    "transports": ["SMS"]
};

shoutout.postMessages(message, {}, function (err, result, response) {
    if (err) {
        console.error('Error sending message!');
    } else {
        console.info('Sending message successful!');
    }
});
