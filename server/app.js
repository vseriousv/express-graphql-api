const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 9000;

mongoose.connect('mongodb://vseriousv:social123@localhost:27017/aidaprint', { useNewUrlParser: true });

app.use(cors());

app.use('/graphql',cors(), graphqlHTTP({
    schema,
    graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connection to DB!'));

app.listen(PORT, err => {
    err ? console.log(error) : console.log('Server started on port -'+PORT);
})
