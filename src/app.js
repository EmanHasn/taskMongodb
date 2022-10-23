const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

app.use(express.urlencoded({extended:true}))
app.set('view engine' , 'hbs');

app.use(express.static(path.join(__dirname , "../resources/public")))
app.set("views" , path.join(__dirname , "../resources/views"))
hbs.registerPartials(path.join(__dirname , "../resources/layouts"))
const postRouter = require("../routes/post.route");
app.use(postRouter);

app.all("*" , (req, res) => res.render("err404" , {pageTitle : "page not found"}))

module.exports = app;