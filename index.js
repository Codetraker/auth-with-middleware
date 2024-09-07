const express = require("express");

const app = express();

function userMiddleware (req, res, next){
    const username = req.header.username;
    const passwprd = req.header.passwprd;
    if(username != "admin" && passwprd != "admin123"){
        res.status(403).json({
            msg : "Incorrect1 Input"
        });
    }else{
        next();
    }
};
function kidneyMiddleware (req, res, next){
    const kidneyId = req.query.kidneyId;
    if(kidneyId != 1 && kidneyId != 2){
        req.status(403).json({
            msg : "Incorrect2 Input"
        });
    }else{
        next();
    }
}

app.get("/health-check", userMiddleware, kidneyMiddleware, function(req, res){
    res.send("Your heart is healthy.");
});
app.get("/kidney-check", userMiddleware, kidneyMiddleware, function(req, res){
    res.send("Your kidney is healthy.");
});

app.listen(3000);