var express = require("express");
var app = express();
var port = process.env.PORT || 5000;
var axios = require("axios");
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());


// cat pic url, medium for now,


const medCatUrl = 'https://api.thecatapi.com/v1/images/search?size=med';

const catApi = "23e061a5-c2d3-480e-8105-2fd0fb96a6aa";

const catHeader = {
  "x-api-key": catApi,
  credentials: "include",
};

app.get('/', function(req, res){
  res.send("Get A Cat")
}) 

app.get('/api/getCat', function(req, res) {
    axios(medCatUrl, catHeader)
        .then((response) => {
         console.log(response.data[0].url, "response, new url");
        res.send(response.data[0].url)
      })
    .catch(function (error) {
      console.log(error, error)
        res.send("error:" + error);
    });
});


app.listen(process.env.PORT || 5000), () => console.log(`serverCat serving CatPics for CatFork ${port}!`);
