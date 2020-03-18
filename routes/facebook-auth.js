const express = require("express")
    passport  = require("passport")
    app = express()
    router = express.Router()

socialPassport = require("../controllers/passport-social")



// router.get('/logout',(req,res,next)=>{
//     req.logout()
//     res.redirect("/")
// })

    router.get('/auth/facebook',
passport.authenticate('facebook', { scope:['email'] }));


router.get("/auth/facebook/callback",passport.authenticate('facebook',{successRedirect:'/secret',failureRedirect:'/login'}))
    


  module.exports = router