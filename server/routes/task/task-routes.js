var TaskModel = require("./task-model")
var passport = require('passport');

var TaskRoutes = function (app) {
    this.app = app;
    this.task = new TaskModel(app)
    this.init();
};
module.exports = TaskRoutes;

TaskRoutes.prototype.init = function () {
    var self = this;
    var isAuthenticated = passport.authenticate('jwt', { session: false })
    function sessionCheck(req, res, next) {
        if (req.session && req.session.user) {
            next();
        } else {
            next();
            /* res.status(401)
            res.json({ status: false, err: "Not logged in!" }) */
        }
    }

    self.app.get('/', function (req, res) {
        res.json({ status: true, data: "Welcome to API Service" });
    });

    // Add Tasks
    self.app.post('/addTask', isAuthenticated, function (req, res) {
        self.task.addTask(req, function (response) {
            res.json(response);
        })
    });

    // Update Task
    self.app.put('/updateTask', isAuthenticated, function (req, res) {
        self.task.updateTask(req, function (response) {
            res.json(response);
        })
    });

    // Get All Tasks
    self.app.get('/getTask/:id', isAuthenticated, function (req, res) {
        self.task.getTask(req, function (response) {
            res.json(response);
        })
    });

    // Get single task
    self.app.get('/getAllTasks',isAuthenticated, function (req, res) {
        self.task.getAllTasks(req,  function (response) {
            res.json(response);
        })
    });

    // Delete Tasks
    self.app.delete('/deleteTask',isAuthenticated, function (req, res) {
        self.task.deleteTask(req, function (response) {
            res.json(response);
        })
    });

};