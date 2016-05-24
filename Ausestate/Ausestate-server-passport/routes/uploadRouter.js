var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Property = require('../models/property');
var multer = require('multer');
var assert = require('assert');

var uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

//multers disk storage settings
var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/images/')
        },
        filename: function (req, file, callback) {
            
            callback(null, file.fieldname + '-' + Date.now()+ file.originalname)
        }
        });

//multer settings
var upload = multer({
                    storage: storage
                }).single('file');

//find the property with no upload images
uploadRouter.get('/upload', function(req, res) {
    
    var propertytitle = req.body.title;

    Property.find({"title":propertytitle},{"images":null})
        .exec(function (err, property) {
        if (err) throw err;

        console.log("get all the upload properties");
        });

       
});

uploadRouter.post('/update', function(req, res) {
      upload(req,res,function(err){
          if(err){
              res.json({error_code:1,err_desc:err});
              return;
          }


          var propertytitle = req.body.title;

          var fileMimetype = req.file.mimetype;

          var fileExtention = "";

          if(fileMimetype === "image/jpeg")
          {
            fileExtention = "jpg"
          }
          else if(fileMimetype === "image/png")
          {
            fileExtention = "png"
          }
          else
          {
            fileExtention = "error"
          }

          var imagesUpload = [{
              path : req.file.path,
              extension:fileExtention
          }];

          Property.update({"title":propertytitle},
              {$set:{images:imagesUpload}})
              .exec(function (err, property) {
              if (err) throw err;

              console.log("image url is updated");
            });

          res.json({error_code:0,err_desc:null});
      });
       
});

uploadRouter.post('/insert', function(req, res) {
      upload(req,res,function(err){
          if(err){
              res.json({error_code:1,err_desc:err});
              return;
          }


          var propertytitle = req.body.title;

          var fileMimetype = req.file.mimetype;

          var fileExtention = "";

          if(fileMimetype === "image/jpeg")
          {
            fileExtention = "jpg"
          }
          else if(fileMimetype === "image/png")
          {
            fileExtention = "png"
          }
          else
          {
            fileExtention = "error"
          }

          var imagesUpload = {
              path :"http://localhost:3000/images/" + req.file.filename,
              extension:fileExtention
          };

          Property.update({"title":propertytitle},
              {$push:{images:imagesUpload}})
              .exec(function (err, property) {
              if (err) throw err;

              console.log("image url is inserted");
            });

          res.json({error_code:0,err_desc:null});
      });
       
});

module.exports = uploadRouter;