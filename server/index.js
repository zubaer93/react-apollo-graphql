const path = require("path");
const express = require("express");
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var fs = require('fs');
const app = express(); // create express app

// GraphQL schema
var schema = buildSchema(`
    type Query {
      message: String
    },
    type Mutation {
      updateMessage(message: String!): String
    }
`);

var getMessage = () => {
  return fs.readFileSync("data.txt").toString('utf-8');
} 

var updateMessage = function({message}) {
  fs.writeFileSync('data.txt', message, 'utf-8', function(err, data) {
      if (err) throw err;
  });
  return fs.readFileSync("./data.txt").toString('utf-8');
}

var root = {  
  message: getMessage,
  updateMessage: updateMessage
};

// add middleware
app.use(express.static(path.join(__dirname, "..", "build")));
app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

// start express server on port 3000
app.listen(3000, () => {
  console.log("server started on port 3000");
});
