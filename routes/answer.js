var AnswerService = require('../services/answer')
var express = require('express')
var router = express.Router()
var passport = require('./config/config')

router.get('/',
    async (req, res) => {
        var answers = await AnswerService.find()
        res.send(answers);
})

router.get('/:id',   
    async (req, res) => {
        var answer = await AnswerService.findById(req.params.id)
        res.send(answer)
})

router.post('/',   
    passport.authenticate('jwt', {session: false}),
    passport.authorizeRoles('ADMIN', 'USER'),
    (req, res) => { 
        var answer = AnswerService.save(req.body)
        res.send(answer)
})

module.exports = router
