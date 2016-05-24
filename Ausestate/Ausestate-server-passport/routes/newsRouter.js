var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var News = require('../models/news');

var newsRouter = express.Router();
newsRouter.use(bodyParser.json());

newsRouter.route('/')
.get(function (req, res, next) {
    News.find({})
        .exec(function (err, news) {
        if (err) throw err;
        res.json(news);
    });
})

.post(function (req, res, next) {
    News.create(req.body, function (err, news) {
        if (err) throw err;
        console.log('News created!');
        var id = news._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the news with id: ' + id);
    });
})

.delete(function (req, res, next) {
    News.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

newsRouter.route('/:id')
.get(function (req, res, next) {
    console.log(req.params.id);
    News.findById(req.params.id, function(err, property) {
        if (err) throw err;

        res.json(property);
    
    });
})
.put(function (req, res, next) {
    News.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, property) {
        if (err) throw err;
        res.json(property);
    });
})
.delete(function (req, res, next) {
    
    News.findByIdAndRemove(req.params.id, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = newsRouter;