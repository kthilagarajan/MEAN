var Task = function(aId, aTitle, aDescription, aFile){
    return {
        taskId : aId,
        title : aTitle,
        description: aDescription,
        file: new Buffer(aFile, 'base64').toString('binary')
    }
}
module.exports = Task;