const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;

mongoose.connect('mongodb://vseriousv:social123@localhost:27017/aidaprint', { useNewUrlParser: true });

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use(cors());

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connection to DB!'));

app.listen(PORT, err => {
    err ? console.log(error) : console.log('Server started!');
})
