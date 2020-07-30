require('dotenv').config()
const path=require("path")
const express=require("express")
var bodyParser = require('body-parser');
const hbs=require("hbs")
const util=require("./util.js")
const request=require("request")
const app=express()
const publicpath=path.join(__dirname,"../public")
const nodemailer = require('nodemailer')
const partialpath=path.join(__dirname,"/template")
console.log(require("dotenv").config())
console.log(process.env.EMAIL,process.env.PASS)
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set("view engine","hbs")
hbs.registerPartials(partialpath)
app.use(express.static(publicpath))
app.use(bodyParser.urlencoded({ extended: true })); 
app.get("",function(req,res){
    res.render("index",{
        title:"Weather",
        name:"faraz"
    })
})


app.get("/help",function(req,res){
    res.render("help",{
        title:"Help",
        name:"faraz",
        text:"help text"
    })
})
app.get("/about",function(req,res){
    res.render("about",{
        title:"About Me",
        name:"Faraz"
    })
})


app.get("/weather",function(req,res){
    if (!req.query.address){
        return res.send({
            error:"Please enter a location"
        })
    }
   util.geocode(req.query.address,function(error,data){
    if (error){
        console.log("cant find")
        return res.send({
            error:"Cant find location"
        })
    }
    else{
        util.forecast(data.lat,data.lon,function(error,dataf){
            res.send({
                area:data.area,
                summary:dataf.summary,
                address:req.query.address
            })
           })
    }
       
   })
})

app.post("/geo",function(req,res){
     lat=req.body.lat,
    long=req.body.long
    util.revgeo(lat,long,function(error,data){
        global.area=data.area
    })
    util.forecast(lat,long,function(error,dataf){
        global.summ=dataf.summary
       })
})

app.post("/email",function(req,res){
    if (req.body.send){
        console.log("xd")
        console.log(req.body.search)
        
        const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:process.env.EMAIL,
    pass:process.env.PASS // naturally, replace both with your real credentials or an application-specific password
  }
});

const mailOptions = {
  from: 'weather-app@weather.com',
  to: req.body.search,
  subject: 'Weather Forecast',
  text: req.body.text
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
 

    }
})
app.get("/g",function(req,res){
    res.send({
        summ:global.summ,
        area:global.area
    })
})

app.get("/help/*",function(req,res){
    res.render("404",{
        title:"404 Page",
        name:'Faraz',
        text:"help 4o4"
    })
})
app.get("*",function(req,res){
    res.render("404",{
        title:"404 Page",
        name:'Faraz',
        text:"4o4"
    })
})
app.listen(process.env.PORT || 3000,function(){
    console.log("run")
})
