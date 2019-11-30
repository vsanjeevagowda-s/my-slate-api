const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/environment');
const dbConnect = require('./models/connect');
const {workspace} = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

workspace(app);

dbConnect.on('connected', () => {
  console.log('db connected at: ', config.db_url)
  const server = app.listen(config.port, () => {
    console.log(`my-slate api listening on port ${config.port}!`);
  });
});