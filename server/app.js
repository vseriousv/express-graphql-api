const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');

const app = express();
const PORT = 9000;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, err => {
    err ? console.log(error) : console.log('Server started!');
})