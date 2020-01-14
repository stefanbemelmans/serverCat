var express = require("express");
var app = express();
var port = process.env.PORT || 5000;
var axios = require("axios");
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./db");
const dbName = "data";
const collectionName = "visitors";

const allVisitors = "/api/visitors";
const visitorByNum = "/api/visitors/:num";
const addNewVisitor = "/api/visitors/add";
const editVisitor = "/api/visitors/:num";
const deleteVisitor = "/api/visitors/delete/:num"

// << db init >>
db.initialize(
  dbName,
  collectionName,
  function(dbCollection) {
    // successCallback
    // get all items
    dbCollection.find().toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
    });

    // << db CRUD routes >>

    // Add One
    app.post(addNewVisitor, (request, response) => {
      const item = request.body;
      console.log(item)
      dbCollection.insertOne(item, (error, result) => {
        // callback of insertOne
        if (error) throw error;
        // return updated list
        dbCollection.find().toArray((_error, _result) => {
          // callback of find
          if (_error) throw _error;
          response.json(_result);
        });
      });
    });

    
    // Get one
    app.get(visitorByNum, (request, response) => {
      const itemNum = request.params.num;

      dbCollection.findOne({ num: itemNum }, (error, result) => {
        if (error) throw error;
        // return item
        response.json(result);
      });
    });

    // Get All
    app.get(allVisitors, (request, response) => {
      // return updated list
      dbCollection.find().toArray((error, result) => {
        if (error) throw error;
       response.json(result);
      });
    });

    // update one --Probably not needed for the Portfolio but is needed for catfork
    app.put(editVisitor, (request, response) => {
      const itemId = request.params.id;
      const item = request.body;
      console.log("Editing item: ", itemId, " to be ", item);

      dbCollection.updateOne(
        { id: itemId },
        { $set: item },
        (error, result) => {
          if (error) throw error;
          // send back entire updated list, to make sure frontend data is up-to-date
          dbCollection.find().toArray(function(_error, _result) {
            if (_error) throw _error;
            response.json(_result);
          });
        }
      );
    });
  },
  function(err) {
    // failureCallback
    throw err;
  }
);

// cat pic url, medium for now,

const medCatUrl = "https://api.thecatapi.com/v1/images/search?size=med";

const catApiKey = "23e061a5-c2d3-480e-8105-2fd0fb96a6aa";

const catPicUrl = "/api/getCat";
const catHeader = {
  "x-api-key": catApiKey,
  credentials: "include"
};

app.get("/", function(req, res) {
  res.send("Get A Cat");
});

app.get(catPicUrl, function(req, res) {
  axios(medCatUrl, catHeader)
    .then(response => {
      console.log(response.data[0].url, "response, new url");
      res.send(response.data[0].url);
    })
    .catch(function(error) {
      console.log(error, error);
      res.send("error:" + error);
    });
});

app.listen(process.env.PORT || 5000),
  () => console.log(`serverCat serving CatPics for CatFork ${port}!`);
