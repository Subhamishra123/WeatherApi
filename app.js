let express=require('express');
let dotEnv=require('dotenv');
dotEnv.config();
let app=express();
let port=parseInt(process.env.PORT);

let key=process.env.apiKey;
let request=require('request');
app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');
app.get('/weather/:city',(req,response)=>{
    let city=req.params.city;
    let url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
    request(url,(error,apiResponse)=>{
        if(error) throw error;
        //let output=JSON.parse(apiResponse.body);
        response.render('index',{title:'weather',result:JSON.parse(apiResponse.body)});
       // response.send(JSON.parse(apiResponse.body));
    });

});
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`server started at ${port}`);
});