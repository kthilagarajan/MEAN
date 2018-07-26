var UserModel = require("./user-model")

var UserRoutes = function (app) {
    this.app = app;
    this.user = new UserModel(app)
    this.init();
};
module.exports = UserRoutes;

UserRoutes.prototype.init = function () {
    var self = this;

    function sessionCheck(req, res, next) {
        if (req.session && req.session.user) {
            next();
        } else {
            next();
            /* res.status(401)
            res.json({ status: false, err: "Not logged in!" }) */
        }
    }

    // Register
    self.app.post('/register', function (req, res) {
        self.user.register(req, function (response) {
            res.json(response);
        })
    });

    // Login
    self.app.post('/login', function (req, res) {
        self.user.login(req, function (response) {
            res.json(response);
        })
    });
};