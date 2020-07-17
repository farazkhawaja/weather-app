




document.querySelector("form").addEventListener("submit",function(e){
    e.preventDefault()
    const search=document.querySelector("input").value
    document.querySelector("#form").style.display="block"
    document.querySelector("#email").innerHTML="Click To email"
    console.log(search)
    document.querySelector(".loc").innerHTML="Loading Location"
        document.querySelector(".summ").innerHTML="Loading Summary"
    fetch("/weather?address="+search).then(function(response){
    response.json().then(function(data){
        if (data.error){
            document.querySelector(".loc").innerHTML="Try again"
            document.querySelector(".summ").innerHTML="-"
        } else{
        console.log(data.area)
        console.log(data.summary)
        document.querySelector(".loc").innerHTML=data.area
        document.querySelector(".summ").innerHTML=data.summary
        }
        
    })
   
})

})
document.querySelector("#demo").addEventListener("click",function(e){
    $("#demo").trigger("click")
    
    document.querySelector("#form").style.display="block"
    document.querySelector("#email").innerHTML="Click To email"
    fetch("/g").then(function(response){
        response.json().then(function(data){
            console.log(data)
          document.querySelector(".summ").innerHTML=data.summ
          document.querySelector(".loc").innerHTML=data.area
          document.querySelector("#email").innerHTML="Click To email"
          
          
        })
        })
})

$(document).ready(function(){
    $("#email").click(function(e){
        $('#status').html("Email sent")
        $('#status').fadeToggle(5000);
        e.preventDefault()
                $.post("/email",
                {
                  send:"yes",
                  text:"Area: "+$(".loc").html()+"--- "+"             Summary: "+$(".summ").html(),
                  search:$('#input').val(),

                })
                

        })
       
    
    })
