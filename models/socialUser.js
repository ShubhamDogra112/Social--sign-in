const express = require("express")
     mongoose = require("mongoose")


      let socialUserSchema = new mongoose.Schema({
          
          username:{
              type:String,
              required:true
          },
          socialId:{
              type:String,
              required:true
          }
      })


      module.exports = mongoose.model("SOCIALUSER",socialUserSchema)
