const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.port || 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./db");

//import routes
let usersRoutes = require("./routes/users");
let moviesRoutes = require("./routes/movies");
let genresRoutes = require("./routes/genres");
let moviesGenresRoutes = require("./routes/movies-genres");
let althgorithmsRoutes = require("./routes/algorithms");
let countriesRoutes = require("./routes/countries");
//train
let trainRoutes = require("./train/routes");
//setup server
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

//connect mongodb
mongoose.Promise = global.Promise;
mongoose
  .connect(db.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log(`Database is connected!`);
    },
    err => {
      console.log(`Can not connect database! ${err}`);
    }
  );

//routes
app.use("/users", usersRoutes);
app.use("/movies", moviesRoutes);
app.use("/genres", genresRoutes);
app.use("/moviesgenres", moviesGenresRoutes);
app.use("/algorithms", althgorithmsRoutes);
app.use("/countries", countriesRoutes);
app.use("/train", trainRoutes);