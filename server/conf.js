var ENV = 'dev'; //'prod'

var conf = {
    dev: {
        hostName: '0.0.0.0',
        web: {
            port: 2002
        },
        mongodb: {
            host: "localhost",
            port: 2001,
            dbname: 'tasksdb',
            username: "",
            password: ""
        }
    },
    prod: {
        hostName: '0.0.0.0',
        web: {
            port: 8080
        },
        mongodb: {
            host: "localhost",
            port: 27017,
            dbname: 'demodb',
            username: "",
            password: ""
        }
    }
};

module.exports = conf[ENV];