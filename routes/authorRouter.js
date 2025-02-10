const { Router } = require("express");
const passport = require("passport");
const authorController = require('../controller/authorController')
const { addUser, addMessage , displayMessage, deleteMsg} = require("../db/query ");
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
authorRouter.post("/Create-new-Post",addMessage);

authorRouter.get("/view-post/messages", authorController.renderIndex);


authorRouter.post("/deleteMsg/:id",authorController.deleteMsg);

module.exports = authorRouter;  