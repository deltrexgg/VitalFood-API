const mongoose = require("mongoose");
const express = require("express");
const app = express();

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
  mongoose.connect('mongodb+srv://vitalfood:SLvHUhOXMpan1lRE@deltrexgg.kk2a2st.mongodb.net/vital')
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
          // Close the Mongoose connection
          mongoose.connection.close().then(() => console.log('Connection closed'));
        });
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error);
    });
});

app.listen(5000, () => {
  console.log("Server is live");
});
