var mongoose = require('mongoose');
var schmea = mongoose.Schema;

var limitSchema = new schmea({
    //neigung
    maxTemperatur: String,
    minTemperatur: String,
    //neigung
    maxIncline: String,
    minIncline: String,
    //Luftfeuchtigkeit
    maxHumidity: String,
    minHumidity: String,
     //helligkeit
    maxBrightness: String,
    minBrightness: String
});

limitSchema.statics = {
    load: function(id, cb){
        this.findOne({_id : id}).exec(cb);
        //this.find().exec(cb);
    }
};

mongoose.model('limit',limitSchema);

//Model für andere Komponenten verfügbar machen
//var limit = module.exports = mongoose.model('limit', limitSchema);
