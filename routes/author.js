var AuthorService = require('../services/author')
var express = require('express')
var router = express.Router()
var passport = require('./config/config')

router.get('/', 
    passport.authenticate('jwt', {session: false}),
    passport.authorizeRoles('ADMIN','USER'),
    async (req, res) => {
        var authors = await AuthorService.find()
        res.send(authors);    
})

router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    passport.authorizeRoles('ADMIN','USER'),
    async (req, res) => {
        var author = await AuthorService.findById(req.params.id)
        res.send(author)
})

router.post('/',  
    passport.authenticate('jwt', {session: false}),
    passport.authorizeRoles('ADMIN'),
    (req, res) => {
        var author = AuthorService.save(req.body)
        res.send(author)
})

router.put('/',  
    passport.authenticate('jwt', {session: false}),
    passport.authorizeRoles('ADMIN'),
    async (req, res)=>{
        var author = await AuthorService.update(req.body)
        res.send(author)
})

router.delete('/:id', 
    passport.authenticate('jwt', {session: false}),
    passport.authorizeRoles('ADMIN'),
    async (req, res)=>{
        var success = await AuthorService.deleteById(req.params.id)
        if (success)
            res.send(success);
        else
            res.status(404).send();
})

module.exports = router
