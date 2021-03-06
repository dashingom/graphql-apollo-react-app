const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require("mongoose");
const config = require('config');
const cors = require('cors');

const app = express();

//allow cross origin
app.use(cors());

//DB Config
const db = config.get('mongoURI');

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb Connected"))
  .catch(err => console.log(err));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})