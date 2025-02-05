const express = require("express");
const authorRouter = require("./routes/authorRouter.js");
const app = express();

const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use("/",authorRouter)


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});