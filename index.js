var express = require("express");
var app = express();
const dotenv = require('dotenv').config();
var port = process.env.PORT || 5000;
var axios = require("axios");
var cors = require("cors");
var bodyParser = require("body-parser");



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// cat pic url, medium for now,

const medCatUrl = "https://api.thecatapi.com/v1/images/search?size=med";

const catApiKey = process.env.catApiKey;


const catPicUrl = "/api/getCat";
const catHeader = {
  "x-api-key": catApiKey,
  credentials: "include"
};

app.get("/", function (req, res) {
  res.send("Get A Cat");
});

app.get(catPicUrl, function (req, res) {
  axios(medCatUrl, catHeader)
    .then(response => {
      console.log(response.data[0].url, "response, new url");
      res.send(response.data[0].url);
    })
    .catch(function (error) {
      console.log(error, error);
      res.send("error:" + error);
    });
});

const headers = {
  "method": "GET",
  "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  "x-rapidapi-Key": process.env.SpoonacularApiKey
}
const recipeSearchBaseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=";
const recipeSearch = "/api/recipeSearch/:ingredients";
const separator = "%252C";

app.get("/api/recipeSearch/", function (req, res) {
  var spoonacularRequest = axios.create({
    headers: headers
  })

  var ingredients = JSON.parse(req.query.ingredients);
  console.log(ingredients);
  var cleanedIngredientString = ingredients
    .split(",")
    .map(x => x.trim());
  console.log(cleanedIngredientString);

  const ingredientQueryString = cleanedIngredientString.join(separator);
  console.log(ingredientQueryString);
  var spoonUrl = recipeSearchUrlFactory(ingredientQueryString);
  spoonacularRequest(spoonUrl)
    .then(response => {
      console.log(response, "response, new url");
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error, error);
      res.send("error:" + error);
    });
})




const recipeSearchUrlFactory = (ingredientString) => recipeSearchBaseUrl + ingredientString;
const getRecipeDetailsUrlFactory = (recipeId) => getRecipeDetailsBaseUrl + recipeId + getRecipeDetailsEndUrl;



app.listen(process.env.PORT || 5000),
  () => {
    return console.log(`serverCat serving CatPics for CatFork ${port}!`);
  };
