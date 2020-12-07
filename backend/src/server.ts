import express, { Application , Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { ConnectionError, ConnectionTimedOutError, TimeoutError, Sequelize } from 'sequelize';

import { ProductController } from './controllers/product.controller';
import { UserController } from './controllers/user.controller';
import { SecuredController } from './controllers/secured.controller';
import { MessageController } from './controllers/message.controller';

import { User } from './models/user.model';
import { Preference } from './models/preference.model';
import { Address } from './models/address.model';
import { Product } from './models/product.model';
import { Order } from './models/order.model';
import { Category } from './models/category.model';
import { Subcategory } from './models/subcategory.model';
import { ItemRented } from './models/item-rented.model';
import { ItemSold } from './models/item-sold.model';
import { ServiceRented } from './models/service-rented.model';
import { Message } from './models/message.model';
import { MessageThread } from './models/messageThread.model';
import { MessageThreadParticipants } from './models/messageThreadParticipants.model';

export class Server {
    private server: Application;
    private sequelize: Sequelize;
    private port = process.env.PORT || 3000;

    constructor() {
        this.server = this.configureServer();
        this.sequelize = this.configureSequelize();


        User.initialize(this.sequelize);
        Product.initialize(this.sequelize);
        Order.initialize(this.sequelize);
        Preference.initialize(this.sequelize);
        Address.initialize(this.sequelize);
        Category.initialize(this.sequelize);
        Subcategory.initialize(this.sequelize);
        ItemSold.initialize(this.sequelize);
        ItemRented.initialize(this.sequelize);
        ServiceRented.initialize(this.sequelize);
        Message.initialize(this.sequelize);
        MessageThread.initialize(this.sequelize);
        MessageThreadParticipants.initialize(this.sequelize);

        User.createAssociations();
        Product.createAssociations();
        Order.createAssociations();
        Preference.createAssociations();
        Address.createAssociations();
        Category.createAssociations();
        Subcategory.createAssociations();
        ItemSold.createAssociations();
        ItemRented.createAssociations();
        ServiceRented.createAssociations();
        Message.createAssociations();
        MessageThread.createAssociations();
        MessageThreadParticipants.createAssociations();

        Category.createCategories();

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
            .use('/message', MessageController)
            .options('*', cors(options))
            .use('/assets', express.static('assets'))
            // this is the message you get if you open http://localhost:3000/ when the server is running
            .get('/', (req, res) => res.send('<h1>Welcome to the ESE-2020 Backend Scaffolding <span style="font-size:50px">&#127881;</span></h1>'));
    }

    private configureSequelize(): Sequelize {
        return new Sequelize({
            dialect: 'sqlite',
            storage: 'db.sqlite',
            logging: false, // can be set to true for debugging
            retry: {
              match: [
                ConnectionError,
                ConnectionTimedOutError,
                TimeoutError,
                /Deadlock/i,
                'SQLITE_BUSY'],
              max: 3
            }
        });
    }
}

const server = new Server(); // starts the server
