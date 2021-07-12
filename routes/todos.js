const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', ( req, res) => {
    res.render('index' , {
        title: 'Create Todo',
        isIndex: true,
    })
})

router.get('/todolist', async (req, res) => {
    const todos = await Todo.find({}).lean()

    res.render('todolist', {
        title: 'Todo List',
        isTodolist: true ,
        todos
    })
})

router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })

    await todo.save()
    res.redirect('/todolist')
})
router.delete('/', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.body.id)
    res.redirect('/todolist')
})


module.exports = router