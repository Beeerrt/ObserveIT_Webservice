var model = require('../models/infounitModel');
var mongoose = require('mongoose');
var infounitModel = mongoose.model('infounit');
var _ = require('underscore');

/**
 * Abspeichern einer Infounit
 * @param {*} req 
 * @param {*} res 
 */
exports.post = function(req, res){
      
    var newinfounit = new infounitModel(req.body);
    console.log(newinfounit.save());
    console.log("Infounit gespeichert: ");
    console.log(newinfounit);
    res.jsonp(newinfounit);
};

/**
 * Laden aller Infounits
 * @param {*} req 
 * @param {*} res 
 */
exports.get = function(req, res) {
    
    infounitModel.find().exec(function(err, infounits) 
    {
        res.jsonp(infounits);
    });
};

/**
 * Laden einer Infounit anhand der InfounitID
 * @param {*} req 
 * @param {*} res 
 */
exports.show = function(req, res){
    infounitModel.load(req.params.infounitId, function(err, infounit)
    {
        res.jsonp(infounit);
    });
};

/**
 * Updaten einer Infounit
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * Löschen einer Infounit
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = function(req, res){
    infounitModel.load(req.params.infounitId, function(err, infounit)
    {
        infounit.remove(function(err){
            res.jsonp(infounit);
        })    
    });
};