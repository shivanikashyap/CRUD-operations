const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: {type: String},
    position: {type: String},
    contactno: {type: Number}
});

module.exports = { Employee };
