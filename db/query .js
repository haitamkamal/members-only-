const { Passport } = require("passport");
const pool = require("./pool");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");


async function addUser(req,res,next) {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password,10)
  await pool.query("INSERT INTO member (email,first_name,last_name,password) VALUES ($1,$2,$3,$4)",[
    req.body.email,
    req.body.first_name,
    req.body.last_name,
    hashedPassword
  ])
   res.redirect('/');
  }catch(err){
    return next(err)
  }
}

 passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        console.log("Login Attempt for:", email);

        const { rows } = await pool.query("SELECT * FROM member WHERE email = $1", [email]);
        const user = rows[0];

        if (!user) {
          console.log("User not found!");
          return done(null, false, { message: "Incorrect email" });
        }

        console.log("User found:", user);
        const match = await bcrypt.compare(password,user.password)
        if (!match) {
          console.log("Incorrect password!");
          return done(null, false, { message: "Incorrect password" });
        }

        console.log("Login successful!");
        return done(null, user);
      } catch (err) {
        console.log("Error during authentication:", err);
        return done(err);
      }
    }
  )
);

 passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user.id); // Ensure `id` exists in the user object
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("Deserializing user with ID:", id);
    const { rows } = await pool.query("SELECT * FROM member WHERE id = $1", [id]);
    const user = rows[0];

    if (!user) {
      console.log("User not found in deserializeUser");
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    console.log("Error in deserializeUser:", err);
    done(err);
  }
});

async function addMessage(req,res) {
  await pool.query("INSERT INTO messages (title,content) VALUES ($1,$2)",[
    req.body.title,
    req.body.content
  ])
  res.redirect("/login-User");
}

async function displayMessage(req, res) {
  const result = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
   return result.rows;
}

module.exports={
  addUser,
  addMessage,
  displayMessage
}