const { ObjectId } = require("mongodb");

// Remove any pre-existing dat
db = Mongo('mongodb://localhost:27017').getDB('hopops');
db.dropDatabase();
db.dropAllUsers()

// Reconnect and create database
db = Mongo('mongodb://localhost:27017').getDB('hopops');

db.createUser(
    { 
        user:"dbAdmin", 
        pwd:"test", 
        roles:["readWrite","dbAdmin"]
    }
)

db.article.insertMany( [
    {
        articleID: new ObjectId("000000000000000000000001"), 
        title: "First!", 
        ownerID: 1, 
        date: new Date("2023-04-23T13:00:00Z"), 
        body:"Literally the first-est post on hopops. This is how I show I am a man of culture.", 
        parentArticle: null
    },
    {
        articleID: new ObjectId("000000000000000000000002"), 
        title: "test_post", 
        ownerID: 1, 
        date:new Date("2023-04-23T14:00:00Z"), 
        body:"Test post. Please Ignore.", 
        parentArticle: null
    },
    {
        articleID: new ObjectId("000000000000000000000003"), 
        title: "test_reply", 
        ownerID: 1, 
        date:new Date("2023-04-24T14:00:00Z"), 
        body:"Test reply. Please Ignore.", 
        parentArticle: new ObjectId("000000000000000000000002")
    },
    {
        articleID: new ObjectId("000000000000000000000004"), 
        title: "Fake Articles", 
        ownerID: 1, 
        date:new Date("2023-04-24T14:00:00Z"), 
        body:"Really? Fake news has spread here too?", 
        parentArticle: new ObjectId("000000000000000000000002")
    } 
] )

db.user.insertMany( [
    {
        userID: new ObjectId("000000000000000000000011"), 
        name: "John Doe", 
        email: "mcdonnell32@gmail.com", 
        premiumStatus: "true"
    },
    {
        userID: new ObjectId("000000000000000000000012"), 
        name: "Some Smuck", 
        email: "mcdonn11@seattleu.edu", 
        premiumStatus: "false"
    }
] )

db.brewery.insertOne(
    {
        breweryID: new ObjectId("000000000000000000000021"),
        userID: new ObjectId("000000000000000000000011"),
        name: "HopOps Brewery",
        address: "Seattle, WA",
        phoneNumber: 1234567890
    }
)

db.brew.insertOne(
    {
        brewID: new ObjectId("000000000000000000000111"),
        recipe: new ObjectId("000000000000000000000061"),
        startDate: new Date("2023-04-23T13:00:00Z"),
        endDate: new Date("2023-04-24T13:00:00Z"),
        batchSize: 1,
        status: "Brewing"
    }
)

db.gathering.insertOne(
    {
        gatheringID: new ObjectId("000000000000000000000031"),
        articleID: new ObjectId("000000000000000000000011"),
        time: new Date("2023-04-23T13:00:00Z"),
        rsvps: [new ObjectId("000000000000000000000011")]
    }
)

db.ingredient.insertMany( [
    {
        ingredientID: new ObjectId("000000000000000000000041"),
        name: "Water",
        description: "Dihydrogen Monoxide is essential for beer",
        unitSize: "L",
        quanitity: 500
    },
    {
        ingredientID: new ObjectId("000000000000000000000042"),
        name: "Yeast",
        description: "Man's best friend since 8000 BC",
        unitSize: "g",
        quanitity: 80
    }
] )

db.inventory.insertOne(
    {
        inventoryID: new ObjectId("000000000000000000000051"),
        ownerID: new ObjectId("000000000000000000000021"),
        ingredients: [new ObjectId("000000000000000000000041"), 
                      new ObjectId("000000000000000000000042")]
    }
)

db.recipe.insertOne(
    {
        recipeID: new ObjectId("000000000000000000000061"),
        title: "First try and brewing",
        description: "This is my very first attempt",
        image: "https://media.licdn.com/dms/image/C560BAQEfkGMMt27R_g/company-logo_200_200/0/1611935117290?e=1683763200&v=beta&t=DfRP7GxwOuYGMdKLPLLsanz3CJ67z_mlzd-Ke84cwe0",
        body: "Boy I hope this goes well",
        recipe: [{ingredient: new ObjectId("000000000000000000000041"), 
                  quantity: 2}],
        favorite: true
    }
)

db.recipeList.insertOne(
    {
        recipeListID: new ObjectId("000000000000000000000071"),
        ownerID: new ObjectId("000000000000000000000021"),
        recipes: [new ObjectId("000000000000000000000061")]
    }
)

db.saleHistory.insertOne(
    {
        saleHistoryID: new ObjectId("000000000000000000000081"),
        ownerID: new ObjectId("000000000000000000000021"),
        sales: [new ObjectId("000000000000000000000091")]
    }
)

db.sale.insertOne(
    {
        saleID: new ObjectId("000000000000000000000091"),
        date: new Date("2023-04-23T13:00:00Z"),
        paymentMethod: "IOU",
        soldItems: [new ObjectId("000000000000000000000101")]
    }
)

db.soldItem.insertOne(
    {
        soldItemID: new ObjectId("000000000000000000000101"),
        quantitySold: 3,
        pricePerUnit: 4
    }
)