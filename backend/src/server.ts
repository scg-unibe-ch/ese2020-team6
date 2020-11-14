import { ProductController } from './controllers/product.controller';
import express, { Application , Request, Response } from 'express';
import morgan from 'morgan';
import { UserController } from './controllers/user.controller';
import { SecuredController } from './controllers/secured.controller';
import { Sequelize } from 'sequelize';
import { User } from './models/user.model';
import { CategoriesService } from './services/categories.service';
import { Preference } from './models/preference.model';
import { Address } from './models/address.model';
import cors from 'cors';
import { Products } from './models/products.model';

export class Server {
    private server: Application;
    private sequelize: Sequelize;
    private port = process.env.PORT || 3000;

    constructor() {
        this.server = this.configureServer();
        this.sequelize = this.configureSequelize();


        User.initialize(this.sequelize);
        Products.initialize(this.sequelize);
        Preference.initialize(this.sequelize);
        Address.initialize(this.sequelize);
        Preference.createAssociations();
        User.createAssociations();
        Address.createAssociations();

        this.sequelize.sync().then(() => {                           // create connection to the database
            this.server.listen(this.port, () => {                                   // start server on specified port
                console.log(`server listening at http://localhost:${this.port}`);   // indicate that the server has started
            });
        });
    }

    private configureServer(): Application {
        // options for cors middleware
        const options: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: `http://localhost:${this.port}`,
            preflightContinue: false,
        };

        return express()
            .use(cors())
            .use(express.json({ limit: '10mb' }))                    // parses an incoming json to an object
            .use(morgan('tiny'))                    // logs incoming requests
            .use('/user', UserController)
            .use('/secured', SecuredController)
            .use('/product', ProductController)
            .options('*', cors(options))
            .use(express.static('./src/public'))
            // this is the message you get if you open http://localhost:3000/ when the server is running
            .get('/', (req, res) => res.send('<h1>Welcome to the ESE-2020 Backend Scaffolding <span style="font-size:50px">&#127881;</span></h1>'));
    }

    private configureSequelize(): Sequelize {
        return new Sequelize({
            dialect: 'sqlite',
            storage: 'db.sqlite',
            logging: false // can be set to true for debugging
        });
    }

    // set up the values of the Categories and Subcategories Databases
    private setUpDatabases() {
        CategoriesService.setUpCategories();
        CategoriesService.setUpSubcategories();
    }
}

const server = new Server(); // starts the server
