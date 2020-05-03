const request=require("request")


const forecast=function(lat,lon,callback){
    var url="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=54782925e015d68f12e1c0e2f35f5ef2&units=metric"
    request({url:url,json:true},function(error,response){
        if (error) {
            callback("network issue",undefined)
            
        }
        else if(response.body.cod){
            callback("location not found",undefined)
        }
        
        else {
            callback(undefined,{
                 temp:response.body.current.temp,
                 main:response.body.current.weather[0].main,
                summary: "temp is "+response.body.current.temp+" degrees and it's "+response.body.current.weather[0].main+" outside" 
            })
        }
           
    })
}

const geocode=function(address,callback){
    var geo="http://dev.virtualearth.net/REST/v1/Locations/"+address+"?o=json&key=AiENWQOdHmtgehmaSGKR6IgNeBQSK8gjAjYrUeyMtBPOW11ypH-yzMTWvXIdAQLZ"
    request({url:geo,json:true},function(error,response){
        
        if (error) {
            callback("error",undefined)
        }
         if(response.body.errorDetails){
            callback("cant find location",undefined)
        }
        else if(response.body.resourceSets[0].resources.length==0){
            callback("cant find location",undefined)
        }
        else{
            callback(undefined,{
            lat:response.body.resourceSets[0].resources[0].point.coordinates[0],
            lon:response.body.resourceSets[0].resources[0].point.coordinates[0],
            area:response.body.resourceSets[0].resources[0].address.formattedAddress+"("+response.body.resourceSets[0].resources[0].address.adminDistrict+")"
            })
        }
    })
}

module.exports={
    geocode:geocode,
    forecast:forecast
}