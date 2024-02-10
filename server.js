const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.set('view engine', 'ejs')


// Define a Mongoose schema
const userSchema = new mongoose.Schema({
  condition: String,
  description: String,
  recommendedfood: [String],
  avoidfood: [String],
  exercise: [String]
  // other fields in your schema
});

// Define a Mongoose model based on the schema
const User = mongoose.model("User", userSchema);

app.get('/api', (req, res) => {
  const data = req.query.condition;

  // Connect to MongoDB using Mongoose
  mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
      console.log('Connected to MongoDB');

      // Retrieve data using Mongoose queries
      User.find({ condition: data })
        .then(data => {
          res.json(data);
        })
        .catch(error => {
          res.send("Internal Error")
        })
        .finally(() => {
          // Close the Mongoose connection 111
          mongoose.connection.close().then(() => console.log('Connection closed'));
        });
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error);
    });
});

app.get('/',(req,res) =>{
  res.render('index.ejs')
})

app.listen(5000, () => {
  console.log("Server is live");
});
