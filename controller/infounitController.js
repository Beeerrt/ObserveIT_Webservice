var infounitModile = require('../Models/infounitModel');
var mongoose = require('mongoose');
var infounitModel = mongoose.model('infounit');
var _ = require('underscore');

exports.post = function(req, res){
    //var infounit = mongoose.model('infounit',infounitModile);
    // var unit = new infounit ({
    //     nodeid: 1,      
    //     temperatura: '12',
    //     incline: '12',
    //     humidity: '12',
    //     brightness: '12',
    //     positon: 'wohnzimmer'
    //   });
    
    // var newInfounit = new infounitModel(unit);
    
    // var unit = new infounit ({
    //     nodeid: 1,      
    //     temperatura: '12',
    //     incline: '12',
    //     humidity: '12',
    //     brightness: '12',
    //     positon: 'wohnzimmer'
    //   });
    //   unit.save(function(err){
    //     if(err)
    //     {
    //         console.log(err);
    //     }
    //   });
      
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