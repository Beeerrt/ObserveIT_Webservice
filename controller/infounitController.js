var model = require(__base + 'Models/infounitModel');
var mongoose = require('mongoose');
var infounitModel = mongoose.model('infounit');
var _ = require('underscore');

exports.post = function(req, res){
      
    var newinfounit = new infounitModel(req.body);
    newinfounit.save();
    res.jsonp(newinfounit);
};

exports.get = function(req, res) {;
    infounitModel.find().exec(function(err, infounits) 
    {
        res.jsonp(infounits);
    });
};


exports.show = function(req, res){
    infounitModel.load(req.params.infounitId, function(err, infounit)
    {
        res.jsonp(infounit);
    });
};

exports.put = function(req, res){
    infounitModel.load(req.params.infounitId, function(err, infounit)
    {
        //zusammenführen der MongoDB Objektes und des JS Objektes
        infounit = _.extend(infounit, req.body);

        infounit.save(function(err){
            res.jsonp(infounit);
        });
    });
};


exports.delete = function(req, res){
    infounitModel.load(req.params.infounitId, function(err, infounit)
    {
        infounit.remove(function(err){
            res.jsonp(infounit);
        })    
    });
};