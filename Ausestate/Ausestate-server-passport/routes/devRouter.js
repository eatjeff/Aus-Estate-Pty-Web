var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Developments = require('../models/development');

var devRouter = express.Router();
devRouter.use(bodyParser.json());

devRouter.route('/')
.get(function (req, res, next) {
    Developments.find({})
        .exec(function (err, devs) {
        if (err) throw err;
        res.json(devs);
    });
})

.post(function (req, res, next) {
    Developments.create(req.body, function (err, dev) {
        if (err) throw err;
        console.log('dev created!');
        var id = dev._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the dev with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Developments.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

devRouter.route('/:id')
.get(function (req, res, next) {
    console.log(req.params.id);
    Developments.findById(req.params.id, function(err, property) {
        if (err) throw err;

        res.json(property);
    
    });
})
.put(function (req, res, next) {
    Developments.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, property) {
        if (err) throw err;
        res.json(property);
    });
})
.delete(function (req, res, next) {
    
    Developments.findByIdAndRemove(req.params.id, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = devRouter;