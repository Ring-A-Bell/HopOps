var chai = require('chai');
var chaiHttp = require('chai-http');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('Testing Recipes and results', () => {
    const userID = "YPs-zlGU6gwxOAH3O-zWb";
    var response;
    var responseBody;

    before(function(done) {
        chai.request('http://localhost:8080')
            .get('/app/userrecipes/' + userID)
            .end((err, res) =>{
                response = res;
                responseBody = res.body;

                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should return a JSON object of the user\'s recipes', () => {
        console.log(responseBody);
        console.log(responseBody[0].recipes[0]);
        expect(response).to.have.status(200);
        expect(responseBody).to.have.lengthOf(1);
        expect(responseBody[0]).to.be.an('object');
        expect(response).to.be.json;
        expect(response).to.have.headers;
    });

    it('Should have known key properties', () => {
        expect(responseBody[0]).to.have.property('_id');
        expect(responseBody[0]).to.have.property('recipeListID');
        expect(responseBody[0]).to.have.property('ownerID');
        expect(responseBody[0]).to.have.property('recipes').to.have.lengthOf(3);
    });

    it('Each recipe in the user\'s list should have the correct properties', () => {
        expect(responseBody[0]).to.satisfy((body) => {
            for (var i = 0; i < body.recipes.length; i++) {
                expect(body.recipes[i]).to.have.property('recipeID').that.is.a('string').to.have.lengthOf(21);
                expect(body.recipes[i]).to.have.property('title');
                expect(body.recipes[i]).to.have.property('description');
                expect(body.recipes[i]).to.have.property('image');
                expect(body.recipes[i]).to.have.property('body');
                expect(body.recipes[i]).to.have.property('favorite');
                //expect(body.recipes[i]).to.have.property('recipeIngredients').to.have.length.above(0);
                expect(body.recipes[i]).to.have.property('recipe').that.is.an('array');
            }
            return true;
        });
    });
})