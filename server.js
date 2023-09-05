const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const {v4:uuid4} =require("uuid");
const router = require("./router");;
const nocache = require("nocache");

const port = process.env.PORT ||8000;

app.use(express.urlencoded({extended:true}))

//nocatch 
app.use(nocache());

// set view engine and dir
app.set("view engine", "ejs");

//load static files
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/assets',express.static(path.join(__dirname,'public','assets')));

app.use(session({
    secret:uuid4(),
    resave:false,
    saveUninitialized:false
}))


app.use('/route',router);


//home route
app.get('/',nocache(),(req, res) => {
    if(req.session.user){
        res.redirect('/route/dashboard')
    }
    else{
        res.render("base",{titl : "Login System"});
    }
});

app.listen(port, () => {console.log(`Server @ http://localhost:${port}`)});


new Promise((resolve,reject) => {
    const success = true;
    if(success){
        resolve();
    }
    else{
        reject();
    }
}).then()

