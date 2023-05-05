"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var nanoid_1 = require("nanoid");
var ArticleModel_js_1 = require("./models/ArticleModel.js");
var GatheringModel_js_1 = require("./models/GatheringModel.js");
var UserModel_js_1 = require("./models/UserModel.js");
var BrewModel_js_1 = require("./models/BrewModel.js");
var BreweryModel_1 = require("./models/BreweryModel");
var IngredientModel_1 = require("./models/IngredientModel");
var RecipeModel_1 = require("./models/RecipeModel");
console.log(ArticleModel_js_1.ArticleModel);
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.Articles = new ArticleModel_js_1.ArticleModel();
        this.Users = new UserModel_js_1.UserModel();
        this.Gathering = new GatheringModel_js_1.GatheringModel();
        this.Brews = new BrewModel_js_1.BrewModel();
        this.Brewery = new BreweryModel_1.BreweryModel();
        this.Ingredient = new IngredientModel_1.IngredientModel();
        this.Recipe = new RecipeModel_1.RecipeModel();
        this.expressApp = express();
        this.middleware();
        this.routes();
        console.log('App successfully started');
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.get('/hello', function (req, res, next) {
            res.json({
                message: 'Hello World!'
            });
        });
        // Get all forum articles
        router.get('/app/articles', function (req, res) {
            console.log('Querying all articles');
            var x = _this.Articles.retrieveAllArticles(res);
            console.log(x);
        });
        // Get a single forum article
        router.get('/app/articles/:articleID', function (req, res) {
            var id = req.params.articleID;
            console.log('Query single list with id: ' + id);
            var x = _this.Articles.retrieveArticle(res, id);
            console.log(x);
        });
        // Get a single forum article's replies
        router.get('/app/articles/:articleID/replies', function (req, res) {
            var id = req.params.articleID;
            console.log('Query single list with id: ' + id);
            _this.Articles.retrieveReplies(res, id);
        });
        // Create a new forum article
        router.post('/app/articles', function (req, res) {
            var jsonObj = req.body;
            jsonObj.articleID = (0, nanoid_1.nanoid)();
            var x = _this.Articles.createArticle(res, jsonObj);
            console.log(x);
            res.send('{"id":"' + jsonObj.articleID + '"}');
        });
        // Delete a forum article
        router.delete('/app/articles/:articleID', function (req, res) {
            var id = req.params.articleID;
            console.log('Delete article list with id: ' + id);
            var x = _this.Articles.deleteArticle(res, id);
            console.log(x);
        });
        // Get all brews
        router.get('/app/brews', function (req, res) {
            console.log('Query all brews');
            var x = _this.Brews.retrieveAllBrews(res);
            console.log(x);
        });
        // Get a single brew
        router.get('/app/brews/:brewID', function (req, res) {
            var id = req.params.brewID;
            console.log('Query single brew with id: ' + id);
            var x = _this.Brews.retrieveBrew(res, id);
            console.log(x);
        });
        // Create a new brew
        router.post('/app/brews', function (req, res) {
            console.log(req.body);
            var id = (0, nanoid_1.nanoid)();
            var jsonObj = req.body;
            jsonObj.brewID = id;
            var x = _this.Brews.createBrew(res, jsonObj);
            console.log(x);
            res.send('{"id":"' + id + '"}');
        });
        // Update a brew's status
        router.patch('/app/brews/:brewID', function (req, res) {
            var id = req.params.brewID;
            var updatedStatus = req.body.newStatus;
            var x = _this.Brews.updateBrewStatus(res, id, updatedStatus);
            console.log(x);
        });
        // Get all breweries
        router.get('/app/brewery', function (req, res) {
            console.log('Query all breweries');
            var x = _this.Brewery.retrieveAllBreweries(res);
            console.log(x);
        });
        // Get a single brewery
        router.get('/app/brewery/:breweryID', function (req, res) {
            var id = req.params.breweryID;
            console.log('Query single brewery with id: ' + id);
            var x = _this.Brewery.retrieveBrewery(res, id);
            console.log(x);
        });
        // Create a new brewery
        router.post('/app/brewery', function (req, res) {
            var id = (0, nanoid_1.nanoid)();
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.breweryID = id;
            var x = _this.Brewery.createBrewery(res, jsonObj);
            console.log(x);
            res.send('{"id":"' + id + '"}');
        });
        // Update a brewery's information
        router.put('/app/brewery/:breweryID', function (req, res) {
            var id = req.params.breweryID;
            var jsonObj = req.body;
            var x = _this.Brewery.updateBrewery(res, id, jsonObj);
            console.log(x);
        });
        // Delete a brewery from the database
        router.delete('/app/brewery', function (req, res) {
            var breweryName = req.body.breweryName;
            var x = _this.Brewery.deleteBrewery(res, breweryName);
            console.log(x);
        });
        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        // Get all commnuity events
        router.get('/app/gatherings', function (req, res) {
            console.log('Querying all community events');
            var x = _this.Gathering.retrieveAllGatherings(res);
            console.log(x);
        });
        // Create new community event
        router.post('/app/gatherings', function (req, res) {
            var id = (0, nanoid_1.nanoid)();
            var jsonObj = req.body;
            jsonObj.listId = id;
            var x = _this.Gathering.model.create([jsonObj]);
            res.send('{"id":"' + id + '"}');
        });
        //Create a new recipe
        router.post('/app/recipes', function (req, res) {
            var id = (0, nanoid_1.nanoid)();
            var jsonObj = req.body;
            jsonObj.recipeID = id;
            //const x = this.Recipe.model.create([jsonObj]);
            //const x = this.Recipe.addRecipe(res, jsonObj);
            //console.log(x);
            res.send('{"id":"' + id + '"}');
        });
        // Get all ingredients
        router.get('/app/ingredients', function (req, res) {
            console.log('Query all ingredients');
            var x = _this.Ingredient.retrieveAllIngredients(res);
            console.log(x);
        });
        // Get a single ingredient
        router.get('/app/ingredients/:ingredientID', function (req, res) {
            var id = req.params.ingredientID;
            var x = _this.Ingredient.retrieveIngredient(res, id);
        });
        // Create a new ingredient
        router.post('/app/ingredients', function (req, res) {
            var id = (0, nanoid_1.nanoid)();
            console.log(req.body);
            var ingredient = {
                ingredientID: id,
                name: req.body.name,
                description: req.body.description,
                unitSize: req.body.unitSize,
                quantity: req.body.quantity,
            };
            var x = _this.Ingredient.model.create([ingredient]);
            res.send(x);
        });
        // Delete an ingredient
        router.delete('/app/ingredients/:ingredientID', function (req, res) {
            var id = req.params.ingredientID;
            var x = _this.Ingredient.deleteIngredient(res, id);
        });
        router.patch('/app/ingredients/:ingredientID/qty', function (req, res) {
            var id = req.params.ingredientID;
            var qty = parseInt(req.body.quantity, 10);
            var x = _this.Ingredient.updateIngredientQuantity(res, id, qty);
        });
        this.expressApp.use('/', router);
    };
    return App;
}());
exports.App = App;
