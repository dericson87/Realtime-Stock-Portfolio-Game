var express = require('express');
module.exports = function(app) {
    app.use(express.static(path.join(__dirname, 'server/public')));
};