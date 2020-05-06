




document.querySelector("form").addEventListener("submit",function(e){
    e.preventDefault()
    const search=document.querySelector("input").value
    console.log(search)
    document.querySelector(".loc").innerHTML="Loading Location"
        document.querySelector(".summ").innerHTML="Loading Summary"
    fetch("/weather?address="+search).then(function(response){
    response.json().then(function(data){
        if (data.error){
            console.log("error")
            document.querySelector(".loc").innerHTML="Cant find location. Try Again"
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

document.querySelector("button").addEventListener("click",function(){
    document.querySelector(".loc").innerHTML="Loading Location"
        document.querySelector(".summ").innerHTML="Loading Summary"
    fetch("/geo").then(function(response){
        response.json().then(function(data){
            if (data.error){
                document.querySelector(".loc").innerHTML=data.error
            document.querySelector(".summ").innerHTML="-"
            } else{
                document.querySelector(".loc").innerHTML=data.area
            document.querySelector(".summ").innerHTML=data.summary
            }
        })
    })})
    