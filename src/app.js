const path=require("path")
const express=require("express")
var bodyParser = require('body-parser');
const hbs=require("hbs")
const util=require("./util.js")
const request=require("request")
const app=express()
const publicpath=path.join(__dirname,"../public")
const partialpath=path.join(__dirname,"/template")

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
app.get("/geo",function(req,res){
    var url="http://ipinfo.io/geo?token=7ea1023f74c4be"
    request({url,json:true},function(error,data){
    console.log(data.body.loc)
    if (error){
        return res.send({
            error: "turn on gps"
        })
    }
    else{
            lat=data.body.loc.split(",")[0]
            long=data.body.loc.split(",")[1]
            util.forecast(lat,long,function(error,dataf){
                res.send({
                    summary:dataf.summary,
                    area:data.body.city+","+data.body.region

                })
               })
    }

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
