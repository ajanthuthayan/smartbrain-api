const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("enter a valid endpoint");
});

app.post("/signin", signin.handleSignIn(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.put("/image", image.handleImage(db));

app.post("/imageurl", image.handleApiCall(db));

app.listen(process.env.PORT || 3000, () => console.log(`Server is running on port ${process.env.PORT}.`));

/*
/ -> res server is working
/signin -> POST res succes or fail
/register -> POST res new created user
/image -> PUT res updated user
*/
