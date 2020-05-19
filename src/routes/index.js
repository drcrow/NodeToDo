const express = require('express');
const router = express.Router();
const Task = require('../models/task')

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    //console.log(tasks);
    res.render('index', {
        view_tasks: tasks
    });
});

router.post('/add', async (req, res) => {
    const newTask = new Task( req.body );
    await newTask.save();
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.remove( { _id: id } );
    res.redirect('/');
});

router.get('/done/:id', async (req, res) => {
    const { id } = req.params;
    const editedTask = await Task.findById(id);
    editedTask.status = !editedTask.status;
    await editedTask.save();
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const editedTask = await Task.findById(id);
    const tasks = await Task.find();
    res.render('edit', {
        view_tasks: tasks,
        view_task: editedTask
    });

});

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    //const editedTask = await Task.findById(id);
    //console.log(editedTask);
    //editedTask.title = req.body.title;
    //editedTask.description = req.body.description;
    //console.log(editedTask);
    //await editedTask.save();
    await Task.update({_id: id}, req.body);
    res.redirect('/');
});

module.exports = router;