var mongoose = require('mongoose');
var schmea = mongoose.Schema;

var infounitSchema = new schmea({
    nodeid: Number,
    date: {
        type: Date,
        default: Date.now
    },        
    temperatur: String,
    incline: String,
    humidity: String,
    brightness: String,
    level: String,
    position: String
});

infounitSchema.statics = {
    load: function(id, cb){
        this.findOne({_id : id}).exec(cb);    
    }
    
};

mongoose.model('infounit', infounitSchema);
