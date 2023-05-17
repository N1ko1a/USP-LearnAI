var PromptService = require('../services/prompt')
var express = require('express')
var router = express.Router()
var passport = require('./config/config')

router.get('/',
    async (req, res) => {
        var prompts = await PromptService.find()
        // console.log(books);
        res.send(prompts);
})

router.get('/:id',   
    async (req, res) => {
        var prompt = await PromptService.findById(req.params.id)
        res.send(prompt)
})

router.post('/',   
    passport.authenticate('jwt', {session: false}),
    passport.authorizeRoles('ADMIN', 'USER'),
    (req, res) => { 
        var prompt = PromptService.save(req.body)
        res.send(prompt)
})

module.exports = router
