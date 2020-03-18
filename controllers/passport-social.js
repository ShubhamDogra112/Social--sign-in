const express = require("express")
      passport = require("passport")
      GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
      FacebookStrategy = require("passport-facebook").Strategy;

      socialUser  = require("../models/socialUser")

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    socialUser.findById(id)
    .then(user=>{
        done(null,user)
        
    })
    .catch(err=>{
        console.log(err)
        console.log("Something went wrong")
    })
})


      
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID 
    ,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/redirect"
  },
    
  function(accessToken, refreshToken, profile, done) {
    //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //      return done(err, user);
    //    });

    socialUser.findOne({socialId:profile.id})
    .then((current_user)=>{

        if(current_user){
            console.log(" google user already exist")
            done(null,current_user)
        }
        else{
            new socialUser({
                username:profile.displayName,
                socialId:profile.id
            })
        
            
                    .save()
                    .then((user)=>{
                        console.log("New google user added")
                        
                        done(null,user)
                    })
                    .catch((err)=>{
                        console.log(err)
                        console.log("Somethig went wrong new user not added")
                    })

        }


    })
    .catch((err)=>{
        console.log(err)
        console.log("Something went wrong")
    })

     
  }
  
));



// facebook strategy

      
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_API_KEY,
    
    clientSecret: process.env.FACEBOOK_API_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
    
  function(accessToken, refreshToken, profile, done) {
    //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //      return done(err, user);
    //    });
    
    
    socialUser.findOne({socialId:profile.id})
    .then((current_user)=>{

        if(current_user){
            console.log(" facebook user already exist")
            done(null,current_user)
        }
        else{
            new socialUser({
                username:profile.displayName,
                socialId:profile.id
            })
        
            
                    .save()
                    .then((user)=>{
                        
                        console.log("New facebook user added")
                        
                        done(null,user)
                    })
                    .catch((err)=>{
                        console.log(err)
                        console.log("Something went wrong new user not added")
                    })

        }


    })
    .catch((err)=>{
        console.log(err)
        console.log("Something went wrong")
    })

     
  }
  
));
