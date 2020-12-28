// configures the Sequelize instance and require (or load) the Movie model defined in the models/movie.js file
// exports the db object, which holds the Sequelize and database configurations, as well as the models. Exposing the Sequelize package wherever you import models into your code means that you'll have all of Sequelize's methods and functionality to use. 
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  logging: true
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

db.models.Movie = require('./models/movie.js')(sequelize);
db.models.Person = require('./models/person.js')(sequelize);

module.exports = db;
