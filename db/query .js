const { Passport } = require("passport");
const pool = require("./pool");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

async function addUser(req,res,next) {
  try{
  await pool.query("INSERT INTO member (email,first_name,last_name,password) VALUES ($1,$2,$3,$4)",[
    req.body.email,
    req.body.first_name,
    req.body.last_name,
    req.body.password
  ])
   res.redirect('/');
  }catch(err){
    return next(err)
  }
}

    
 

module.exports={
  addUser
}