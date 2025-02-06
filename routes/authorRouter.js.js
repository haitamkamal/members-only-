const { Router } = require("express");
const passport = require("passport");
const { addUser } = require("../db/query ");
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
    failureRedirect: "/",  // This will redirect the user to the login form on failure
  })
);
authorRouter.get("/login-User",(req,res)=>{
  res.render("loginUser");
})
authorRouter.get("/sing-up",(req,res)=>{
  res.render("singupForm")
})
authorRouter.post("/sing-up",addUser)



module.exports = authorRouter;  