"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const ArticleModel_js_1 = require("./models/ArticleModel.js");
const GatheringModel_js_1 = require("./models/GatheringModel.js");
const UserModel_js_1 = require("./models/UserModel.js");
const BrewModel_js_1 = require("./models/BrewModel.js");
const BreweryModel_1 = require("./models/BreweryModel");
const IngredientModel_1 = require("./models/IngredientModel");
const mongodb_1 = require("mongodb");
console.log(ArticleModel_js_1.ArticleModel);
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.Articles = new ArticleModel_js_1.ArticleModel();
        this.Users = new UserModel_js_1.UserModel();
        this.Gathering = new GatheringModel_js_1.GatheringModel();
        this.Brews = new BrewModel_js_1.BrewModel();
        this.Brewery = new BreweryModel_1.BreweryModel();
        this.Ingredient = new IngredientModel_1.IngredientModel();
        this.expressApp = express();
        this.middleware();
        this.routes();
        console.log('App successfully started');
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        router.get('/hello', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        // Get all forum articles
        router.get('/app/articles', (req, res) => {
            console.log('Querying all articles');
            const x = this.Articles.retrieveAllArticles(res);
            console.log(x);
        });
        // Get a single forum article
        router.get('/app/articles/:articleID', (req, res) => {
            var id = req.params.articleID;
            console.log('Query single list with id: ' + id);
            const x = this.Articles.retrieveArticle(res, id);
            console.log(x);
        });
        // Get a single forum article's replies
        router.get('/app/articles/:articleID/replies', (req, res) => {
            var id = req.params.articleID;
            console.log('Query single list with id: ' + id);
            this.Articles.retrieveReplies(res, id);
        });
        // Create a new forum article
        router.post('/app/articles', (req, res) => {
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.listId = id;
            const x = this.Articles.model.create([jsonObj]);
            console.log(x);
            res.send('{"id":"' + id + '"}');
        });
        // Get all commnuity events
        router.get('/app/gatherings', (req, res) => {
            console.log('Querying all community events');
            const x = this.Gathering.retrieveAllGatherings(res);
            console.log(x);
        });
        // Create new community event
        router.post('/app/gatherings', (req, res) => {
            const id = new mongodb_1.ObjectId();
            var jsonObj = req.body;
            jsonObj.listId = id;
            const x = this.Gathering.model.create([jsonObj]);
            res.send('{"id":"' + id + '"}');
        });
        // Get all brews
        router.get('/app/brews', (req, res) => {
            console.log('Query all brews');
            const x = this.Brews.retrieveAllBrews(res);
            console.log(x);
        });
        // Get a single brew
        router.get('/app/brews/:brewID', (req, res) => {
            var id = req.params.brewID;
            console.log('Query single brew with id: ' + id);
            const x = this.Brews.retrieveBrew(res, id);
            console.log(x);
        });
        // Create a new brew
        router.post('/app/brews', (req, res) => {
            // Typecast error happens here. brewID is a number, but the randomBytes function returns a string.
            //const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var id = new mongodb_1.ObjectId();
            var jsonObj = req.body;
            jsonObj.brewID = id;
            const x = this.Brews.model.create([jsonObj]);
            console.log(x);
            res.send('{"id":"' + id + '"}');
        });
        // Update a brew's status
        router.patch('/app/brews/:brewID', (req, res) => {
            var id = req.params.brewID;
            var updatedStatus = req.body.newStatus;
            const x = this.Brews.updateBrewStatus(res, id, updatedStatus);
            console.log(x);
        });
        /* Possible Duplicates?
    
        router.get('/app/brew/all', (req, res) => {
          console.log('Query all brews');
          const x = this.Brews.retrieveAllBrews(res);
          console.log(x);
        });
    
        router.get('/app/brew/:brewID', (req, res) => {
          var id = parseInt(req.params.brewID, 10);
          console.log('Query single brew with id: ' + id);
          const x = this.Brews.retrieveBrew(res, id);
          console.log(x);
        }); */
        // Get all breweries
        router.get('/app/brewery', (req, res) => {
            console.log('Query all breweries');
            const x = this.Brewery.retrieveAllBreweries(res);
            console.log(x);
        });
        // Get a single brewery
        router.get('/app/brewery/:breweryID', (req, res) => {
            var id = req.params.breweryID;
            console.log('Query single brewery with id: ' + id);
            const x = this.Brewery.retrieveBrewery(res, id);
            console.log(x);
        });
        // Create a new brewery
        router.post('/app/brewery', (req, res) => {
            const id = new mongodb_1.ObjectId();
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.breweryID = id;
            const x = this.Brewery.model.create([jsonObj]);
            console.log(x);
            res.send('{"id":"' + id + '"}');
        });
        // Update a brewery's information
        router.put('/app/brewery', (req, res) => {
            var jsonObj = req.body;
            const x = this.Brewery.updateBrewery(res, jsonObj);
            console.log(x);
        });
        // Delete a brewery from the database
        router.delete('/app/brewery/:breweryID', (req, res) => {
            var id = req.params.breweryID;
            const x = this.Brewery.deleteBrewery(res, id);
            console.log(x);
        });
        // Get all ingredients
        router.get('/app/ingredients', (req, res) => {
            console.log('Query all ingredients');
            const x = this.Ingredient.model.find({});
            console.log(x);
            res.send(x);
        });
        // Get a single ingredient
        router.get('/app/ingredients/:ingredientID', (req, res) => {
            const id = parseInt(req.params.ingredientID, 10);
            console.log('Query single ingredient with id: ' + id);
            const x = this.Ingredient.model.findOne({ ingredientID: id });
            console.log(x);
            res.send(x);
        });
        // Create a new ingredient
        router.post('/app/ingredients', (req, res) => {
            const id = Math.floor(Math.random() * 100000);
            //const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            const ingredient = {
                ingredientID: id,
                name: req.body.name,
                description: req.body.description,
                unitSize: req.body.unitSize,
                quantity: req.body.quantity,
            };
            const x = this.Ingredient.model.create([ingredient]);
            console.log(x);
            res.json({ "id": id });
        });
        // Delete an ingredient
        router.delete('/app/ingredients/:ingredientID', (req, res) => {
            const id = parseInt(req.params.ingredientID, 10);
            console.log('Deleting ingredient with id: ' + id);
            const x = this.Ingredient.model.deleteOne({ ingredientID: id });
            console.log(x);
            res.send({ id: id });
        });
        // TODO: Update ingredient endpoint
        this.expressApp.use('/', router);
    }
}
exports.App = App;
