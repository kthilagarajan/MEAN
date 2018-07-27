var User = require("./user")
var bcrypt = require('bcrypt');
var ObjectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');

var UserModel = function (app) {
    this.conf = app.conf;
    this.db = app.db;
};
module.exports = UserModel;

UserModel.prototype.register = function (req, cbk) {

    var self = this;
    var reqObj = req.query;

    bcrypt.hash(req.body.password, 5, function (err, hash) {
        req.body.password = hash
        self.db.collection('users').insert(req.body, function (err, newDoc) {
            cbk({
                status: true,
                data: newDoc
            })
        })
    });


};

UserModel.prototype.findById = function (id, cbk) {
    var self = this;
    self.db.collection('users').findOne({
        "_id": ObjectId(id)
    }, function (err, docs) {
        cbk(err, docs)
    })
};

UserModel.prototype.login = function (req, cbk) {

    var self = this;
    var reqObj = req.query;

    self.db.collection('users').findOne({
        username: req.body.username
    }, function (err, docs) {
        if (err) {
            cbk(err)
            return
        }
        if (docs != null) {
            bcrypt.compare(req.body.password, docs.password, function (err, res) {
                if (res) {
                    var token = jwt.sign(docs, "openjwtkey", {
                        expiresIn: 100080 // in seconds
                    });
                    cbk({
                        status: true,
                        data: docs,
                        token: 'JWT ' + token
                    })
                } else {
                    cbk({
                        status: false,
                        err: "Invalid Password"
                    })
                }
            });

        } else {
            cbk({
                status: false,
                err: "Invalid Username/Password"
            })
        }
    })
};