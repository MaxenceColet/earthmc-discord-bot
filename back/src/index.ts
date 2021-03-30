import {mongo} from './db';
import * as emcBot from './emcBot';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {config} from './config';

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

app.use('/homeless', require('./routes/homeless.route'));
app.use('/strangers', require('./routes/strangers.route'));

const init = async () => {
  await mongo.connect();
  await emcBot.init();
};

init().then(() => {
  app.listen(config.application.port, () => {
    console.log(`Listening to port ${config.application.port}`);
  });
});
