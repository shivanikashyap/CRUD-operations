const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');

router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if(!err){
            res.send(docs);
        }else{
            console.log('Error in retriving Employees data : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.get('/:id', (req, res) =>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id} `);
    Employee.findById(req.params.id, (err, doc) =>{
        if(!err){res.send(doc);}
        else{console.log('Error in retriving Employee data :' + JSON.stringify(err, undefined, 2));}
    });
});

router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        contactno: req.body.contactno
    });
    emp.save((err, doc) => { 
        if(!err){res.send(doc);}
        else{
            console.log('Error in adding Employee data : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id', (req, res) =>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id} `);
    
    var emp = {
        name: req.body.name,
        position: req.body.position,
        contactno: req.body.contactno
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp}, {new: true}, (err, doc) =>{
        if(!err){res.send(doc);}
        else {
            console.log('Error in updating Employee data : ' + JSON.stringify(err, undefined, 2));
         }
    });
});
 
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;