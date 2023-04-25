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
    } 
] )

db.user.insertOne(
    {
        userID: 1, 
        name: "John Doe", 
        email: "mcdonnell32@gmail.com", 
        premiumStatus: false
    }
)