/**
 * Created by asankanissanka on 6/16/17.
 */

var ShoutOUT = require('./shoutOUT');

class ShoutoutClient{
    constructor(apiKey, debug, verifySSL, messagesEndpoint){
        this.shoutout = new ShoutOUT(undefined, messagesEndpoint);
        this.shoutout.configureMessagesApiKey(apiKey);

    }

    sendMessage(message,callback){
        this.shoutout.postMessagesV1(message, {}, function (err, result, response) {
            if (err) {
                callback(err);
            } else {
                callback(null,result);
            }
        });

    }

    sendPriorityMessage(message,callback){
        this.shoutout.postMessagesV1({priority:1,...message}, {}, function (err, result, response) {
            if (err) {
                callback(err);
            } else {
                callback(null,result);
            }
        });

    }

    sendOtp(otpRequest,callback){
        this.shoutout.postOtpSend(otpRequest, {}, function (err, result, response) {
            if (err) {
                callback(err);
            } else {
                callback(null,result);
            }
        });

    }

    verifyOtp(verifyRequest,callback){
        this.shoutout.postOtpVerify(verifyRequest, {}, function (err, result, response) {
            if (err) {
                callback(err);
            } else {
                callback(null,result);
            }
        });

    }
}

module.exports = ShoutoutClient;