var authService = require('../services/auth')
var router = require('express').Router()

var passport = require('./config/config')


router.post('/register', async (req,res)=>{
    var token = await authService.register(req.body.email, req.body.name, req.body.password);
    if (!token)
        res.status(503)
    res.send(token)
})

router.post('/login', 
    passport.authenticate('local', {session: false}),
    (req,res)=>{
    
    res.send(req.user.generateJwt())
})

module.exports = router;