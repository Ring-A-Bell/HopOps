import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as crypto from 'crypto';
import { nanoid } from 'nanoid';

import { ArticleModel } from './models/ArticleModel.js'
import { GatheringModel } from './models/GatheringModel.js';
import { UserModel } from './models/UserModel.js';
import { BrewModel } from './models/BrewModel.js';
import { BreweryModel } from './models/BreweryModel';
import { IngredientModel } from './models/IngredientModel';
import { ObjectId } from 'mongodb';
import { RecipeModel } from './models/RecipeModel';

console.log(ArticleModel);

class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Articles: ArticleModel;
  public Gathering: GatheringModel;
  public Users: UserModel;
  public Brews: BrewModel;
  public Brewery: BreweryModel;
  public Ingredient: IngredientModel;
  public Recipe: RecipeModel;

  //Run configuration methods on the Express instance.
  constructor() {
    this.Articles = new ArticleModel();
    this.Users = new UserModel();
    this.Gathering = new GatheringModel();
    this.Brews = new BrewModel();
    this.Brewery = new BreweryModel();
    this.Ingredient = new IngredientModel();
    this.Recipe = new RecipeModel();
    this.expressApp = express();
    this.middleware();
    this.routes();
      console.log('App successfully started');
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {

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
        var jsonObj = req.body;
        const x = this.Articles.model.create([jsonObj]);
        console.log(x);
        res.send('{"id":"' + x.articleID + '"}');
    });

    // Delete a forum article
    router.delete('/app/articles/:articleID', (req, res) => {
      var id = req.params.articleID;
      console.log('Delete article list with id: ' + id);
      const x = this.Articles.deleteArticle(res, id);
      console.log(x);
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
      console.log(req.body);
      var id = nanoid();
      var jsonObj = req.body;
      jsonObj.brewID = id;
      const x = this.Brews.createBrew(res, jsonObj);
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
      const id = nanoid();
      console.log(req.body);
      var jsonObj = req.body;
      jsonObj.breweryID = id;
      const x = this.Brewery.createBrewery(res, jsonObj);
      console.log(x);
      res.send('{"id":"' + id + '"}');
    });

    // Update a brewery's information
    router.put('/app/brewery/:breweryID', (req, res) => {
      const id = req.params.breweryID;
      var jsonObj = req.body;
      const x = this.Brewery.updateBrewery(res, id, jsonObj);
      console.log(x);
    });

    // Delete a brewery from the database
    router.delete('/app/brewery', (req, res) => {
      var breweryName = req.body.breweryName;
      const x = this.Brewery.deleteBrewery(res, breweryName);
      console.log(x);
    });
    

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////




    // Get all commnuity events
    router.get('/app/gatherings', (req, res) => {
      console.log('Querying all community events');
      const x = this.Gathering.retrieveAllGatherings(res);
      console.log(x);
    });

    // Create new community event
    router.post('/app/gatherings', (req, res) => {
      const id = new ObjectId();
      var jsonObj = req.body;
      jsonObj.listId = id;
      const x = this.Gathering.model.create([jsonObj]);
      res.send('{"id":"' + id+ '"}');
    });


    //Create a new recipe
    router.post('/app/recipes', (req, res) => {
      const id = crypto.randomBytes(24).toString("hex");
      var jsonObj = req.body;
      jsonObj.recipeID = id;
      //const x = this.Recipe.model.create([jsonObj]);
      //const x = this.Recipe.addRecipe(res, jsonObj);
      //console.log(x);
      res.send('{"id":"' + id + '"}');
    });

    // Get all ingredients
    router.get('/app/ingredients', (req, res) => {
      console.log('Query all ingredients');
      const x = this.Ingredient.retrieveAllIngredients(res);
      console.log(x);
    });

    // Get a single ingredient
    router.get('/app/ingredients/:ingredientID', (req, res) => {
      const id = req.params.ingredientID;
      const x = this.Ingredient.retrieveIngredient(res, id);
    });

    // Create a new ingredient
    router.post('/app/ingredients', (req, res) => {
      const id = crypto.randomBytes(12).toString("hex");
      console.log(req.body);
      const ingredient = {
        ingredientID: id,
        name: req.body.name,
        description: req.body.description,
        unitSize: req.body.unitSize,
        quantity: req.body.quantity,
      };
      const x = this.Ingredient.model.create([ingredient]);
      res.send(x);
    });

    // Delete an ingredient
    router.delete('/app/ingredients/:ingredientID', (req, res) => {
      const id = req.params.ingredientID;
      const x = this.Ingredient.deleteIngredient(res, id);
    });

    router.patch('/app/ingredients/:ingredientID/qty', (req, res) => {
      const id = req.params.ingredientID;
      const qty = parseInt(req.body.quantity, 10);
      const x = this.Ingredient.updateIngredientQuantity(res, id, qty);
    });

    this.expressApp.use('/', router);
  }
}
  
export {App};