import * as express from "express";
import * as bodyParser from "body-parser";

class App {

    public expressApp: express.Application;
    
    constructor() {
        this.expressApp = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        let router = express.Router();
        
        router.get('/forumposts', (req, res) => {
            //console.log("Hello, you've reached list of posts successfully");
            res.send("/forumposts works correctly");
        });

        router.get('/forumposts/:id', (req, res) => {
            //console.log("Hello, you've reached get post successfully");
            var id = req.params.id;

            res.json({ "id": id });
        });

        router.post('/forumposts', (req, res) => {
            //console.log("Hello, you've reached POST post successfully");
            res.send("/forumposts works correctly");
        });

        router.put('/forumposts/:id', (req, res) => {
            //console.log("Hello, you've reached list of posts successfully");
            res.send("/forumposts/:id works correctly");
        });

        router.delete('/forumposts/:id', (req, res) => {
            //console.log("Hello, you've reached list of posts successfully");
            res.send("/forumposts/:id works correctly");
        });


        this.expressApp.use('/', router);
    }
}

export {App};