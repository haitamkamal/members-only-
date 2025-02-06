const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

// Initialize Express
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(session({ secret: "your_secret_key", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

passport.use(
      new LocalStrategy(async(email,password,done)=>{
        try{
          const { rows } = await pool.query("SELECT * FROM member WHERE email = $1 ",[email]);
          const user =  rows[0];
        
        if(!user){
          return done (null ,false, {message : "Incorrect first_name"});
        }
        if(!user.password !== password){
          return done (null,false,{message:"incorrect password"});
        }
        return done(null ,user)
        }catch(err){
          return done(err)
        }
      })
    )
      passport.serializeUser((user,done)=>{
        done(null,user.id);
      })
      passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM member WHERE id = $1", [id]);
      const user = rows[0];
  
      done(null, user);
    } catch(err) {
      done(err);
    }
        });
    

// Import and use routes
const authorRouter = require("./routes/authorRouter.js");
app.use("/", authorRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server listen to port ${PORT}');
});