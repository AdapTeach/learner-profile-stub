var jwt = require('jwt-simple'),
    moment = require('moment');

var authConfig = require('./auth.config');

var authMiddleware = {};

authMiddleware.ensureAuthenticated = function (request, response, next) {
    if (!request.headers.authorization) {
        return response.status(401).send({message: 'Please make sure your request has an Authorization header'});
    }
    var token = request.headers.authorization.split(' ')[1];
    try {
        var payload = jwt.decode(token, authConfig.STUB_SECRET);
        if (payload.exp <= moment().unix()) {
            return response.status(401).send({message: 'Token has expired'});
        } else {
            request.user = payload.user;
            next();
        }
    } catch (error) {
        console.log(error);
        return response.status(401).send({message: error.message});
    }
};

module.exports = authMiddleware;