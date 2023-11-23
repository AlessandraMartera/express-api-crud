const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

const RouterPost = require('./routers/Posts');


app.use("/posts", RouterPost);


app.listen(process.env.PORT, () => {
    console.log(`server avviato sulla porta http://localhost/${process.env.PORT}`)
})