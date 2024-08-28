const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');


const advertsRoutes = require('./routes/adverts.routes');
const authRoutes = require('./routes/auth.routes')


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({
    secret: 'xyz567',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://0.0.0.0:27017/AdsAppDB',  
      collectionName: 'sessions',  
    }),
  }));

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/api', advertsRoutes);
app.use('/auth', authRoutes);



app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

mongoose.connect('mongodb://0.0.0.0:27017/AdsAppDB', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});