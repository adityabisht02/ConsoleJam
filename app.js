//express for creating server and handling requests
const express = require("express");
const app = express();
//mongoose for connecting to DB and queries
const mongoose = require("mongoose");
//body parser for middleware
const bodyParser = require("body-parser");
//path for connecting required resources in public folders
const path = require("path");

//middle ware for parsing UTF-8 encoded urls only
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "public")));

//setting view engine
app.set('view engine','ejs')

//data to be sent for rendering
navbar=['<a href="/">Home</a>',
        '<a href="#grid">Rules</a>',
        '<a href="/gamelibrary">Games</a>',
        '<a href="/login">Login</a>']

data={
	games:['<a href="/gamelibrary/aimlabgridshot"><img src="images/gridshot.gif" class="image" /></a>',
           '<a href="/gamelibrary/wordle"><img src="images/WordleDemo.gif" class="image" /></a>',
           '<a href="/gamelibrary/rockpaperscissors"><img src="images/RockPaperScissorsDemo.gif" class="image" /></a>',
           '<a href="/gamelibrary/aimlabtracker"><img src="images/tracker.gif" class="image" /></a>',
           '<a href="typing.html"><img src="images/typing.gif" class="image" /></a>',
           '<a href="/gamelibrary/tictactoe"><img src="images/tictac" class="image" /></a>']
};

app.get("/",(req, res)=>{
    res.render("index",{navbar:navbar});
});  
  
app.get('/gamelibrary',(req,res)=>{
    res.render('gamelibrary',{navbar:navbar,data:data});
});

app.get('/gamelibrary/tictactoe',(req,res)=>{
    res.render('tictactoe',{navbar:navbar});
});

app.get("/gamelibrary/rockpaperscissors",(req,res)=>{
    res.render("RockPaperScissors",{navbar:navbar});
});
  
app.get("/gamelibrary/aimlabgridshot",(req,res)=>{
    res.render("aimlabgridshot",{navbar:navbar});
});

app.get("/gamelibrary/aimlabtracker",(req,res)=>{
    res.render("aimlabtracker",{navbar:navbar});
});
  
app.get("/gamelibrary/wordle",(req,res)=>{
    res.render("wordle",{navbar:navbar});
});
  


const url = "mongodb://localhost:27017/consoleJam";

mongoose
.connect(url)
.then(function(){
    console.log("Connection to DB successful");
})
.catch(function(err){
    console.log("there was an error");
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
  
const gridshotscoresSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    score:{
        type: Number,
        required: true,
    },
});
  
const users = mongoose.model("User", userSchema);
const gridshotscores = mongoose.model("Gridshotscore", gridshotscoresSchema);

app
  .route("/login")
  .get(function(req,res){
    res.render("login");
  })
  .post(function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    users.findOne({ username: username }, function (err, user) {
        if(err){
            console.log("error");
            console.log(username + "," + password);
        }
        if(user){
            if(user.password == password) {
                console.log(user);
                res.redirect("/");
            }else{
                return res.render("error");
            }
        }else{
            res.render("error");
        }
    });
});
  
app
.route("/register")
.get(function(req, res) {
    res.render("signup");
})
.post(function(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    var user = new users({
      username: username,
      email: email,
      password: password,
    });
    user.save(function(err, user){
        if(err){
            console.log("error ", err);
        }else{
            console.log(username);
        }
        res.redirect("/login");
    });
});

app.listen(3000, function(){
    console.log("listening on port 3000");
});
app.all("*", (req, res) => {
    res.status(404).send("Resource not found");
});