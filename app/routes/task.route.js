var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    app.get('/tasks/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': ObjectID(id) };
        db.collection('tasks').findOne(details, (err, task) => {
            if (err) {
                res.send({ 'error': 'An error has occured' })
            } else {
                res.send(task)
            }
        })
    })

    app.get('/tasks', (req, res) => {
        db.collection('tasks').find().toArray((err, items) => {
            if (err) {
                res.send({ 'error': 'An error has occured' })
            } else {
                res.send(items)
            }
        })
    })

    app.delete('/tasks/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': ObjectID(id) };
        db.collection('tasks').remove(details, (err, task) => {
            if (err) {
                res.send({ 'error': 'An error has occured' })
            } else {
                res.send('Task ' + id + ' Deleted!')
            }
        })
    })

    app.put('/tasks/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': ObjectID(id) };
        const task = { task: req.body.task, completed: req.body.completed }
        db.collection('tasks').update(details, task, (err, task) => {
            if (err) {
                res.send({ 'error': 'An error has occured' })
            } else {
                res.send('Task ' + id + ' Updated!')
            }
        })
    })

    app.post('/tasks', (req, res) => {
        const task = { task: req.body.task, completed: req.body.completed };
        db.collection('tasks').insert(task, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send(result.ops[0]);
            }
        })
    })
};