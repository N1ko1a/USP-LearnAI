const BookService = require('../services/books')
const express = require('express')
const router = express.Router()
const passport = require('./config/config')

router.get('/',
    async (req, res) => {
        const books = await BookService.find()
        res.send(books);
})

router.get('/:id',   
    async (req, res) => {
        const book = await BookService.findById(req.params.id)
        res.send(book)
})

router.post('/',   
    passport.authenticate('jwt', {session: false}),
    passport.authorizeRoles('ADMIN', 'USER'),
    (req, res) => { 
        const book = BookService.save(req.body)
        res.send(book)
})

router.put('/', 
    passport.authenticate('jwt', {session: false}),
    passport.authorizeRoles('ADMIN', 'USER'),
    async (req, res) => {
    
        const book = await BookService.update(req.body)
        res.send(book)
})

router.delete('/:id', 
    passport.authenticate('jwt', {session: false}),
    passport.authorizeRoles('ADMIN'),
    async (req,res) => {
        const success = await BookService.deleteById(req.params.id)
        if (success)
            res.send(success);
        else
            res.status(404).send();
})

module.exports = router
