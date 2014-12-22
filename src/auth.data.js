var jwt = require('jwt-simple'),
    moment = require('moment');

var authConfig = require('./auth.config');

var user = {
    email: 'user@stub.com',
    firstname: 'stubbed',
    lastname: 'user',
    createdAt: moment.valueOf()
};

var payload = {
    user: user,
    iat: moment().valueOf(),
    exp: moment().add(7, 'days').valueOf()
};

var token = jwt.encode(payload, authConfig.STUB_SECRET);

var authData = {
    get: function () {
        return {
            user: user,
            token: token
        };
    }
};

module.exports = authData;