var _ = require('lodash');

var app = require('./express.config')();
var authData = require('./auth.data');
var ensureAuthenticated = require('learner-profile-client').middleWare.ensureAuthenticated;

var stubServerFactory = function (userOptions) {
    var options = {
        port: 5201
    };
    _.extend(options, userOptions);
    return {
        start: function () {
            app.listen(options.port);
            console.log('Starting learner-profile-stub server');
            app.post('/login', function (request, response) {
                response.json(authData.get());
            });
            app.get('/me', ensureAuthenticated, function (request, response) {
                response.json(authData.get().user);
            });
        }
    };
};

module.exports = stubServerFactory;