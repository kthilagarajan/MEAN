var User = require("./user")
var ObjectId = require('mongodb').ObjectID;
var UserModel = function (app) {
    this.conf = app.conf;
    this.db = app.db;
};
module.exports = UserModel;

UserModel.prototype.register = function (req, cbk) {

    var self = this;
    var reqObj = req.query;
    self.db.collection('users').insert(req.body, function (err, newDoc) {
        cbk({
            status: true,
            data: newDoc
        })
    })
};

UserModel.prototype.findById = function (id, cbk) {
    var self = this;
    var reqObj = req.query;
    self.db.collection('users').findOne({"_id":ObjectId(id)}, function (err, docs) {
        cbk(err, docs)
    })
};

UserModel.prototype.login = function (req, cbk) {

    var self = this;
    var reqObj = req.query;
    self.db.collection('users').findOne(req.body, function (err, docs) {
        if (docs && Object.keys(docs).length > 0) {
            cbk({
                status: true,
                data: new User(docs._id, docs.title, docs.description, docs.file)
            })
        } else {
            cbk({
                status: false,
                data: null
            })
        }
    })
};