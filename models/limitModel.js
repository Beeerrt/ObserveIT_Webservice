var mongoose = require('mongoose');
var schmea = mongoose.Schema;

var limitSchema = new schmea({
    maxTemperatur: {
        type: String,
        required: true},
    minTemperatur: {
        type: String,
        required: true},
    avgIncline: {
        type: String,
        required: true},
    maxHumidity: {
        type: String,
        required: true},
    minHumidity: {
        type: String,
        required: true},
    maxBrightness: {
        type: String,
        required: true},
    minBrightness: {
        type: String,
        required: true},
    batterylevel: {
        type: String,
        required: true}
});

limitSchema.statics = {
    load: function(id, cb){
        this.findOne({_id : id}).exec(cb);
    }
};

mongoose.model('limit',limitSchema);

//Model für andere Komponenten verfügbar machen
//var limit = module.exports = mongoose.model('limit', limitSchema);
