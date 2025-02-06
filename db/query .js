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

        if (user.password !== (password)) {
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

  

module.exports={
  addUser,
}