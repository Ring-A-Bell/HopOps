db = connect( 'mongodb://localhost:3000/hopops');

db.createUser(
    { 
        user:"testUser", 
        pwd:"hopops", 
        roles:["readWrite","dbAdmin"]
    }
)

db.article.insertMany( [
    {
        articleID: 1, 
        title: "First!", 
        ownerID: 1, 
        date:new Date("2023-04-23T13:00:00Z"), 
        body:"Literally the first-est post on hopops. This is how I show I am a man of culture.", 
        parentArticle: null
    },
    {
        articleID: 2, 
        title: "test_post", 
        ownerID: 1, 
        date:new Date("2023-04-23T14:00:00Z"), 
        body:"Test post. Please Ignore.", 
        parentArticle: null
    },
    {
        articleID: 3, 
        title: "test_reply", 
        ownerID: 1, 
        date:new Date("2023-04-24T14:00:00Z"), 
        body:"Test reply. Please Ignore.", 
        parentArticle: 2
    },
    {
        articleID: 4, 
        title: "Fake Articles", 
        ownerID: 1, 
        date:new Date("2023-04-24T14:00:00Z"), 
        body:"Really? Fake news has spread here too?", 
        parentArticle: 2
    } 
] )

db.user.insertMany( [
    {
        userID: 1, 
        name: "John Doe", 
        email: "mcdonnell32@gmail.com", 
        premiumStatus: "true"
    },
    {
        userID: 1, 
        name: "Some Smuck", 
        email: "mcdonn11@seattleu.edu", 
        premiumStatus: "false"
    }
] )

db.brewery.insertOne(
    {
        breweryID: 1,
        userID: 1,
        name: "HopOps Brewery",
        address: "Seattle, WA",
        phoneNumber: 1234567890
    }
)

db.gathering.insertOne(
    {
        gatheringID: 1,
        articleID: 1,
        time: Date,
        rsvps: [Number]
    }
)

db.ingredient.insertMany( [
    {
        ingredientID: 1,
        name: "Water",
        description: "Dihydrogen Monoxide is essential for beer",
        unitSize: "L",
        quanitity: 500
    },
    {
        ingredientID: 2,
        name: "Yeast",
        description: "Man's best friend since 8000 BC",
        unitSize: "g",
        quanitity: 80
    }
] )

db.inventory.insertOne(
    {
        inventoryID: 1,
        ownerID: 1,
        ingredients: [1, 2]
    }
)

db.recipeList.insertOne(
    {
        recipeListID: 1,
        ownerID: 1,
        recipes: [1]
    }
)

db.recipe.insertOne(
    {
        recipeID: 1,
        title: "First try and brewing",
        description: "This is my very first attempt",
        image: "https://media.licdn.com/dms/image/C560BAQEfkGMMt27R_g/company-logo_200_200/0/1611935117290?e=1683763200&v=beta&t=DfRP7GxwOuYGMdKLPLLsanz3CJ67z_mlzd-Ke84cwe0",
        body: "Boy I hope this goes well",
        recipe: [{ingredient: 1, quantity: 2}],
        favorite: true
    }
)

db.saleHistory.insertOne(
    {
        saleHistoryID: 1,
        ownerID: 1,
        sales: [1]
    }
)

db.sale.insertOne(
    {
        saleID: 1,
        date: new Date("2023-04-23T13:00:00Z"),
        paymentMethod: "IOU",
        soldItems: [1]
    }
)

db.soldItem.insertOne(
    {
        soldItemID: 1,
        quantitySold: 3,
        pricePerUnit: 4
    }
)