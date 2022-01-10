const express = require("express");
const app = express();
const articleRouter = require("./routes/articles");
const mongoose = require("mongoose");
const Article = require("./models/article")
const methodOverride = require("method-override")
//===============================================================
mongoose.connect("mongodb://localhost:27017/blogDb").then(() => {
    console.log("Connection is Success......!");
})
//=================================================================
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

//==================================================================
app.get("/",async(req,res)=>{
    const articles =await  Article.find().sort({
        createdAt:"desc"
    })
    res.render("articles/index",{articles:articles});
})

//===================================================================
app.use("/articles",articleRouter);

//===================================================================
app.listen(5000,(req,res)=>{
    console.log("Server Is Running on port no 5000")
})