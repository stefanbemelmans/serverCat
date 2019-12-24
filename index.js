var express = require("express");
var app = express();
var port = 3001;
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

// app.get("/api/getCat", (req, res) => {
//   axios.get(medCatUrl, catHeader)
//   .then(function (response) {
//       res.type(response.headers["content-type"]);
//       res.status.send(response.data, "binary");
//   }
  

  
  

const searchBaseUrl =
  "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=";
const searchEndUrl = "&limitLicense=false&number=2&ranking=1";

const recBaseUrl =
  "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/";
const recEndUrl = "/information?includeNutrition=false";

//let recBaseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/{id}/information?includeNutrition=false";

// export function getRecipes(searchTerm) {
//     const ings = searchTerm;
//     return function(dispatch) {
//         dispatch({
//             type: 'GET_RECIPES'
//         });
//         fetch(searchBaseUrl + ings + searchEndUrl, {
//             headers: {
//                 'X-Mashape-Key':
//                     'YmReyxlVdYmshU5Dlyo9XYbBPZtep1KJPXujsnt4Hiueq8H23o'
//             }
//         })
//             .then(response => {
//                 return response.json();
//             })
//             .then(recipes => {
//                 dispatch(searchLoaded(recipes));
//             });
//     };
// }

// export function searchLoaded(recipes) {
//     return {
//         type: 'SEARCH_RESULTS_LOADED',
//         value: recipes
//     };
// }

// export function getIndRec(id) {
//     return function(dispatch) {
//         dispatch({
//             type: 'GET_RECIPE'
//         });
//         fetch(recBaseUrl + id + recEndUrl, {
//             headers: {
//                 'X-Mashape-Key':
//                     'YmReyxlVdYmshU5Dlyo9XYbBPZtep1KJPXujsnt4Hiueq8H23o'
//             }
//         })
//             .then(response => {
//                 return response.json();
//             })
//             .then(recipe => {
//                 dispatch(renderRecipe(recipe));
//             });
//     };
// }

// export function renderRecipe(recipe) {
//     return {
//         type: 'RENDER_RECIPE',
//         value: recipe
//     };
// }

// export function getIndRec(id) {

//   fetch(recBaseUrl + recId + recEndUrl, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "X-Mashape-Key": "YmReyxlVdYmshU5Dlyo9XYbBPZtep1KJPXujsnt4Hiueq8H23o"
//     }
//   }).then(response => {
//     console.log(response);
//     return response.json().then(data => {
//       var recIng = data.extendedIngredients.map(ing => ing.originalString);
//       var instructions = data.instructions;
//       this.setState({
//         instructions: {
//           ...this.state.instructions,
//           [id]: { recIng, instructions }
//         }
//       });
//       console.log(data);
//     });
//   });
// }

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
