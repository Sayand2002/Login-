const express = require("express");
const nocache = require("nocache");
const router = express.Router();


const details = {
    email : "Lexi1234",
    password : "Str0ng@Pa$$"
}
//login user

router.post('/login', (req, res) => {

    const { name, password } = req.body;
    try{
        if (name == details.email && password == details.password) {
            req.session.user = name;    
            res.redirect('/route/dashboard');
        }
        else{
            res.render('base',{message:"User does't exist ! "});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server error")
    }
})

//route for dashboard
router.get('/dashboard',(req, res) => {
    if(req.session.user){
        res.render('dashboard',{user:req.session.user});
    }
    else{
        res.redirect("/");
    }
    
});

router.get('/logout',nocache(),(req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err);
            return;
        }
        // res.render("base",{title : "Login",logout:"Logout Successfully"})
        res.redirect('/')
    })
})


module.exports = router;