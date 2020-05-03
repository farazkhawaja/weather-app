const path=require("path")
const express=require("express")
const hbs=require("hbs")
const util=require("./util.js")

const app=express()
const publicpath=path.join(__dirname,"../public")
const partialpath=path.join(__dirname,"/template")

app.set("view engine","hbs")
hbs.registerPartials(partialpath)
app.use(express.static(publicpath))

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
            error:"error"
        })
    }
   util.geocode(req.query.address,function(error,data){
    if (error){
        console.log("cant find")
        return res.send({
            error:"cant find location"
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
