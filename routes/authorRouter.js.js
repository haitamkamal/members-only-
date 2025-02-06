const { Router } = require("express");
const passport = require("passport");
const { addUser } = require("../db/query ");
const { addPost } = require("../db/query ")
const authorRouter = Router();

authorRouter.get("/",(req,res)=>{
  res.render("home");
})

authorRouter.get("/log-in",(req,res)=>{
  res.render("loginForm")
})

authorRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/login-User",
    failureRedirect: "/",  
  })
);

authorRouter.get("/login-User",(req,res)=>{
  res.render("loginUser",{ user: req.user });
})

authorRouter.get("/sing-up",(req,res)=>{
  res.render("singupForm")
})

authorRouter.post("/sing-up",addUser);

authorRouter.get("/log-out",(req,res,next)=>{
    req.logOut((err)=>{
      if(err){
        return next(err);
      }
      res.redirect("/");
    })
})
authorRouter.get("/Create-new-Post",(req,res)=>{
  res.render("createNewPostForm")
})

module.exports = authorRouter;  