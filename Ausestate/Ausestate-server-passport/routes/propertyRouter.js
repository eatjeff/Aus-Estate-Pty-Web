var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Property = require('../models/property');
var fs = require("fs");

var propertyRouter = express.Router();
propertyRouter.use(bodyParser.json());

propertyRouter.route('/')
.get(function (req, res, next) {
    Property.find({}, function(err, property) {
        if (err) throw err;

        res.json(property);
  });
})

.post(function (req, res, next) {
    Property.create(req.body, function (err, property) {
        if (err) throw err;
        console.log('Property created!');
        var id = property._id;
        res.end('Added the property with id: ' + id);
    });
})
.delete(function (req, res, next) {

    Property.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });

});
/*.delete(function (req, res, next) {
    Property.remove({}, function (err, resp) {
        if (err) throw err;
        
        var dirpath = './public/images';
        fs.readdir(dirpath, function(err, items) {
     
            for (var i=0; i<items.length; i++) {

                var file = dirpath + '/' + items[i];

                console.log("Start: " + file);

                fs.unlink(file, function(err){
                    if (err) throw err;
                    console.log("deleted" + file);
                });
            }

            res.json(resp);
        });

});*/

propertyRouter.route('/query')
.get(function (req, res, next) {
    var purchasetype = req.query.purchasetype;
    var state = req.query.state;
    var propertytype = req.query.propertytype;
    var areacode = req.query.areacode;
    var propertystatus = req.query.propertystatus;
    
    
    Property.find({"propertytype":propertytype,"propertystatus":propertystatus,
                "areacode":areacode,"purchasetype":purchasetype,
               "state":state}, function(err, properties) {
                
                res.json(properties);
    });
});
propertyRouter.route('/video')
.post(function (req, res, next) {

    var videosUpload = {
              name:req.body.propertytitle,
              link :req.body.videolink
    };
    Property.update({"title":req.body.title},
          {$push:{videos:videosUpload}})
          .exec(function (err, property) {
          if (err) throw err;

          res.json(property);
    });
  
});

propertyRouter.route('/school')
.post(function (req, res, next) {

    var schoolsUpload = {
          name:req.body.name,
          address :req.body.address,
          tel:req.body.tel,
          email :req.body.email,
          website :req.body.website,
          type :req.body.schooltype,
          level :req.body.schoollevel
    };

    console.log(schoolsUpload);

    Property.update({"title":req.body.title},
          {$push:{schools:schoolsUpload}})
          .exec(function (err, property) {
          if (err) throw err;

          res.json(property);
    });
  
});

propertyRouter.route('/residential')
.get(function (req, res, next) {
    Property.find({"usage":"residential"}, function(err, property) {
    res.json(property);
  });
});

propertyRouter.route('/commercial')
.get(function (req, res, next) {
    Property.find({"usage":"commercial"}, function(err, property) {
    res.json(property);
  });
});

propertyRouter.route('/inspection')
.get(function (req, res, next) {
    Property.find({"propertystatus":"inspection"}, function(err, property) {
    res.json(property);
  });
});

propertyRouter.route('/auction')
.get(function (req, res, next) {
    Property.find({"propertystatus":"auction"}, function(err, property) {
    res.json(property);
  });
});

propertyRouter.route('/house')
.get(function (req, res, next) {
    Property.find({"propertytype":"townhouse"}, function(err, property) {
    res.json(property);
  });
});

propertyRouter.route('/apartment')
.get(function (req, res, next) {
    Property.find({"propertytype":"apartment & unit"}, function(err, property) {
    res.json(property);
  });
});

propertyRouter.route('/navsearch')
.get(function (req, res, next) {
    Property.find({"areacode":req.query.areacode}, function(err, properties) {
        if (err) throw err;

        res.json(properties);
  });
});

propertyRouter.route('/:id')
.get(function (req, res, next) {
    console.log(req.params.id);
    Property.findById(req.params.id, function(err, property) {
        if (err) throw err;
        res.json(property);
    
    });
})
.put(function (req, res, next) {
    Property.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, property) {
        if (err) throw err;
        res.json(property);
    });
})
.delete(function (req, res, next) {
    //find all the image files it contains
    Property.findById(req.params.id, function(err,property){
        if (err) throw err;
        
        var imagelist = property.images;

        for(var i=0; i < imagelist.length;i++){
            var image = imagelist[i];
            
            var path = image.path.substring(22);
            console.log(path);
            
            fs.exists(path, function(exists) {
                if (exists) {
                    fs.unlink('./public/' + path, function(err){
                        if (err) throw err;
                        console.log("deleted" + image._id);
                    });
                }
            });
        }
    });


    Property.findByIdAndRemove(req.params.id, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = propertyRouter;