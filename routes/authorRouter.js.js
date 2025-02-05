const { Router } = require("express");
const authorRouter = Router();
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

authorRouter.get("/",(req,res)=>{
  res.render("home");
})

authorRouter.get("/log-in",(req,res)=>{
  res.render("loginForm")
})

authorRouter.post(
  "log-in",
  passport.authenticate("local",{
    successRedirect :"/",
    failureRedirect:"/"
  })
)
authorRouter.get("/sing-up",(req,res)=>{
  res.render("SingupForm");
})
module.exports = authorRouter;