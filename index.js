const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/environment');
const dbConnect = require('./models/connect');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());


dbConnect.on('connected', () => {
  console.log('db connected at: ', config.db_url)
  const server = app.listen(config.port, () => {
    console.log(`Edgeplayer api listening on port ${config.port}!`);
  });
});