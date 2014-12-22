var express = require('express'),
    bodyParser = require('body-parser');

module.exports = function () {

    var app = express();

    app.set('showStackError', true);

    app.use(bodyParser.json());

    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).json({
            error: err.stack
        });
    });

    return app;
};