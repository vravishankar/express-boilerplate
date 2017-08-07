const taskRoutes = require('./task.route')

module.exports = function(app, db) {
    taskRoutes(app, db)
}