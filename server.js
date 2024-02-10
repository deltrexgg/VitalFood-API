const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.set('view engine', 'ejs')


// Mongoose schema
const userSchema = new mongoose.Schema({
  condition: String,
  description: String,
  recommendedfood: [String],
  avoidfood: [String],
  exercise: [String]
});

// Mongoose model based on the schema
const User = mongoose.model("User", userSchema);

app.get('/',(req,res) =>{
  res.render('index.ejs')
})

app.get('/api', (req, res) => {
  const data = req.query.condition;

  // Mongoose connection
  mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
      console.log('Connected to MongoDB');

      // Return data
      User.find({ condition: data })
        .then(data => {
          res.json(data);
        })
        .catch(error => {
          res.send("Internal Error - "+error)
        })
        .finally(() => {
          mongoose.connection.close().then(() => console.log('Connection closed'));
        });
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error);
    });
});

app.get('/condition-list',(req,res) => {
   mongoose.connect('mongodb+srv://vitalfood:SLvHUhOXMpan1lRE@deltrexgg.kk2a2st.mongodb.net/vital')
   .then(()=>{
    console.log("Connected")

    User.find({},{'condition':1,'_id':0})
    .then(data =>{
      res.json(data);
    })
    .catch(error =>{
      console.log(error)
    }).finally(() =>{
      mongoose.connection.close().then(() => console.log('Connection closed'));
    });
   })
   .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
})

app.listen(5000, () => {
  console.log("Server is live");
});
