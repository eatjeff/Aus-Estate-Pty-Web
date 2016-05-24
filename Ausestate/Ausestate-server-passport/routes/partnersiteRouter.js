var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Partnersites = require('../models/partnersite');

var partnersiteRouter = express.Router();
partnersiteRouter.use(bodyParser.json());

partnersiteRouter.route('/')
.get(function (req, res, next) {
    Partnersites.find({})
        .exec(function (err, sites) {
        if (err) throw err;
        res.json(sites);
    });
})

.post(function (req, res, next) {
    Partnersites.create(req.body, function (err, site) {
        if (err) throw err;
        console.log('site created!');
        var id = site._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the site with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Partnersites.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

partnersiteRouter.route('/:id')
.get(function (req, res, next) {
    console.log(req.params.id);
    Partnersites.findById(req.params.id, function(err, property) {
        if (err) throw err;

        res.json(property);
    
    });
})
.put(function (req, res, next) {
    Partnersites.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, property) {
        if (err) throw err;
        res.json(property);
    });
})
.delete(function (req, res, next) {
    
    Partnersites.findByIdAndRemove(req.params.id, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = partnersiteRouter;