
let express = require('express');
import { TweetController } from './apps/controllers/tweet.controller';
import { DbConnect } from './lib/dbConnect';

const bodyParser = require('body-parser'),
    logger = require('morgan'),
    methodOverride = require('method-override');

export const app = express();

class middleWare {

    public static init(app) {

        return new Promise((res, rej) => {

            app.use(logger('dev'));
            app.set('view engine', 'ejs');
            app.use(logger('dev'));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(methodOverride('_method'));
            res();
        })
    }

}

export class AppSetUp {

    public static init() {

        return new Promise((res, rej) => {
            //let app = express();
            middleWare.init(app).then(() => {
                return TweetController.init(app);
            })
            .then(()=>{
                return DbConnect.dbConnect();
            })
            .then(() => {
                const PORT = global['locator'].get('config').PORT || 3001;
                    app.listen(PORT);
                    res(true);
                }).
                catch((error) => {
                    rej(error);
                });
               
        });
    }
}
