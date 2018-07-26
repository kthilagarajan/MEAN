var Task = require("./task")
var ObjectId = require('mongodb').ObjectID;
var TaskModel = function (app) {
    this.conf = app.conf;
    this.db = app.db;
};
module.exports = TaskModel;

TaskModel.prototype.getAllTasks = function (req, cbk) {

    var self = this;
    var reqObj = req.query;
    self.db.collection('tasks').find({}).toArray(function (err, docs) {
        let DB_Tasks = docs.map(function(dbTask){
            return new Task(dbTask._id, dbTask.title, dbTask.description, dbTask.file)
        })
        cbk({
            status: true,
            data: DB_Tasks
        })
    })

};

TaskModel.prototype.getTask = function (req, cbk) {

    var self = this;
    var reqObj = req.query;
    self.db.collection('tasks').findOne({"_id":ObjectId(req.params.id)},function (err, docs) {
        cbk({
            status: true,
            data: new Task(docs._id, docs.title, docs.description, docs.file)
        })
    })

};


TaskModel.prototype.addTask = function (req, cbk) {

    var self = this;
    var reqObj = req.query;
    req.body.file = new Buffer(req.body.file, 'binary').toString('base64')
    self.db.collection('tasks').insert(req.body, function (err, newDoc) {
        cbk({
            status: true,
            data: newDoc
        })
    })
};


TaskModel.prototype.updateTask = function (req, cbk) {

    var self = this;
    var reqObj = req.query;
    req.body.file = new Buffer(req.body.file, 'binary').toString('base64')
    self.db.collection('tasks').update({_id: req.body.taskId ? ObjectId(req.body.taskId) : null}, req.body, {upsert:true}, function (err, newDoc) {
        cbk({
            status: true,
            data: newDoc
        })
    })
};


TaskModel.prototype.deleteTask = function (req, cbk) {

    var self = this;
    var reqObj = req.query;
    self.db.collection('tasks').remove({"_id":ObjectId(reqObj.taskId)}, function (err, newDoc) {
        cbk({
            status: true,
            data: newDoc
        })
    })
};