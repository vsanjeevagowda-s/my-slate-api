const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/environment');
const dbConnect = require('./models/connect');
const { Socket } = require('./lib/socket');
const {
  workspace,
  todo,
  helper,
  session,
} = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  return res.json({ message: 'Welcome to my slate api' });
});

workspace(app);
todo(app);
helper(app);
session(app);

io.on('connection', (socket) => {
  console.log('a user is connected')
  // socket.on('join_room', (room) => {
  //   socket.join(room);
  // })
 const socketClient = new Socket({ client: socket });
 console.log(`socketClient => ${socketClient}`)
//  socketClient.registerDisconnectEvent()
})

dbConnect.on('connected', () => {
  console.log('db connected at: ', config.db_url)
  http.listen(config.port, () => {
    console.log(`my-slate api listening on port ${config.port}!`);
  });
});