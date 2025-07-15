const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');
const app = express();

app.use(express.json());
app.use('/', urlRoutes);

mongoose.connect('mongodb+srv://jeeteshbudhani:jeet123@cluster0.21weuzy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cors = require('cors');
app.use(cors());

module.exports = app;
