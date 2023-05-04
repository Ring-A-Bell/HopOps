// Remove any pre-existing data
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
        articleID: "000000000000000000001", 
        title: "First!", 
        ownerID: "000000000000000000011", 
        date: new Date("2023-04-23T13:00:00Z"), 
        body:"Literally the first-est post on hopops. This is how I show I am a man of culture.", 
        parentArticle: null
    },
    {
        articleID: "000000000000000000002", 
        title: "test_post", 
        ownerID: "000000000000000000011", 
        date:new Date("2023-04-23T14:00:00Z"), 
        body:"Test post. Please Ignore.", 
        parentArticle: null
    },
    {
        articleID: "000000000000000000003", 
        title: "test_reply", 
        ownerID: "000000000000000000011", 
        date:new Date("2023-04-24T14:00:00Z"), 
        body:"Test reply. Please Ignore.", 
        parentArticle: "000000000000000000002"
    },
    {
        articleID: "000000000000000000004", 
        title: "Fake Articles", 
        ownerID: "000000000000000000011", 
        date:new Date("2023-04-24T14:00:00Z"), 
        body:"Really? Fake news has spread here too?", 
        parentArticle: "000000000000000000002"
    } 
] )

db.user.insertMany( [
    {
        userID: "000000000000000000011", 
        name: "John Doe", 
        email: "mcdonnell32@gmail.com", 
        premiumStatus: "true"
    },
    {
        userID: "000000000000000000012", 
        name: "Some Smuck", 
        email: "mcdonn11@seattleu.edu", 
        premiumStatus: "false"
    }
] )

db.brewery.insertOne(
    {
        breweryID: "000000000000000000021",
        userID: "000000000000000000011",
        name: "HopOps Brewery",
        address: "Seattle, WA",
        phoneNumber: 1234567890
    }
)

db.brew.insertOne(
    {
        brewID: "000000000000000000111",
        recipe: "000000000000000000061",
        startDate: new Date("2023-04-23T13:00:00Z"),
        endDate: new Date("2023-04-24T13:00:00Z"),
        batchSize: 1,
        status: "Brewing"
    }
)

db.gathering.insertOne(
    {
        gatheringID: "000000000000000000031",
        articleID: "000000000000000000011",
        time: new Date("2023-04-23T13:00:00Z"),
        rsvps: ["000000000000000000011"]
    }
)

db.ingredient.insertMany( [
    {
        ingredientID: "000000000000000000041",
        name: "Water",
        description: "Dihydrogen Monoxide is essential for beer",
        unitSize: "L",
        quantity: 500
    },
    {
        ingredientID: "000000000000000000042",
        name: "Yeast",
        description: "Man's best friend since 8000 BC",
        unitSize: "g",
        quantity: 80
    }
] )

db.inventory.insertOne(
    {
        inventoryID: "000000000000000000051",
        ownerID: "000000000000000000021",
        ingredients: ["000000000000000000041", 
                      "000000000000000000042"]
    }
)

db.recipe.insertOne(
    {
        recipeID: "000000000000000000061",
        title: "First try and brewing",
        description: "This is my very first attempt",
        image: "https://media.licdn.com/dms/image/C560BAQEfkGMMt27R_g/company-logo_200_200/0/1611935117290?e=1683763200&v=beta&t=DfRP7GxwOuYGMdKLPLLsanz3CJ67z_mlzd-Ke84cwe0",
        body: "Boy I hope this goes well",
        recipe: [{ingredient: "000000000000000000041", 
                  quantity: 2}],
        favorite: true
    }
)

db.recipeList.insertOne(
    {
        recipeListID: "000000000000000000071",
        ownerID: "000000000000000000021",
        recipes: ["000000000000000000061"]
    }
)

db.saleHistory.insertOne(
    {
        saleHistoryID: "000000000000000000081",
        ownerID: "000000000000000000021",
        sales: ["000000000000000000091"]
    }
)

db.sale.insertOne(
    {
        saleID: "000000000000000000091",
        date: new Date("2023-04-23T13:00:00Z"),
        paymentMethod: "IOU",
        soldItems: ["000000000000000000101"]
    }
)

db.soldItem.insertOne(
    {
        soldItemID: "000000000000000000101",
        quantitySold: 3,
        pricePerUnit: 4
    }
)