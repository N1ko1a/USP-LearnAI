var BookService = require('../services/books')
var express = require('express')
var router = express.Router()
var passport = require('./config/config')

router.get('/',
    async (req, res) => {
        var books = await BookService.find()
        res.send(books);
})

router.get('/:id',   
    async (req, res) => {
        var book = await BookService.findById(req.params.id)
        res.send(book)
})

router.post('/',   
    passport.authenticate('jwt', {session: false}),
    passport.authorizeRoles('ADMIN', 'USER'),
    (req, res) => { 
        var book = BookService.save(req.body)
        res.send(book)
})

router.put('/', 
    passport.authenticate('jwt', {session: false}),
    passport.authorizeRoles('ADMIN', 'USER'),
    async (req, res) => {
    
        var book = await BookService.update(req.body)
        res.send(book)
})

router.delete('/:id', 
    passport.authenticate('jwt', {session: false}),
    passport.authorizeRoles('ADMIN'),
    async (req,res) => {
        var success = await BookService.deleteById(req.params.id)
        if (success)
            res.send(success);
        else
            res.status(404).send();
})

module.exports = router
