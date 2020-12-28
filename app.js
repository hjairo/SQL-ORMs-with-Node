// imports the database and destructures the 'Movie' model imported from db.models
// contain only code related to syncing models, querying data and CRUD operations
const db = require("./db");
const { Movie, Person } = db.models;
const {Op} = db.Sequelize; // Calling the operator property

(async () => {
  await db.sequelize.sync({ force: true });

  try {
    const movie = await Movie.create({
      title: "Toy Story",
      runtime: 81,
      releaseDate: "1995-11-22",
      isAvailableOnVHS: true,
    });
    // console.log(movie.toJSON());

    const movie2 = await Movie.create({
      title: "The Incredibles",
      runtime: 115,
      releaseDate: "2004-04-14",
      isAvailableOnVHS: true,
    });
    // console.log(movie2.toJSON());

    // New Person record
    const person = await Person.create({
      firstName: "Tom",
      lastName: "Hanks",
    });
    // console.log(person.toJSON());

    // New instance
    const movie3 = await Movie.build({
      title: "Toy Story 3",
      runtime: 103,
      releaseDate: "2010-06-18",
      isAvailableOnVHS: false,
    });
    await movie3.save(); // save the record
    // console.log(movie3.toJSON());

    //const movieById = await Movie.findByPk(1);
    // console.log(movieById.toJSON());

    //const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
    // console.log(movieByRuntime.toJSON());

    // const movies = await Movie.findAll();
    // console.log( movies.map(movie => movie.toJSON()) );
    // const movies = await Movie.findAll({
    //   where: {
    //     runtime: 92,
    //     isAvailableOnVHS: true,
    //   },
    // });
    // // SELECT * FROM Movies WHERE runtime = 92 AND isAvailableOnVHS = true;
    // console.log(movies.map((movie) => movie.toJSON()));

    // const movies = await Movie.findAll({
    //   attributes: ['id', 'title'], // return only id and title
    //   where: {
    //     title: {
    //       [Op.endsWith]: 'story'
    //     },
    //   },
    //   order: [['id', 'DESC']] // IDs in descending order
    // });
    // console.log( movies.map(movie => movie.toJSON()) );

    // const toyStory3 = await Movie.findByPk(3);
    // await toyStory3.update({
    //   title: 'Trinket Tale 3', // new title
    //   isAvailableOnVHS: true,
    // }, {fields: ['isAvailableOnVHS']});
    // console.log( toyStory3.get({ plain: true }) );

    // Find a record
    const toyStory = await Movie.findByPk(1);

    // Delete a record
    await toyStory.destroy();

    // Find and log all movies
    const movies = await Movie.findAll();
    console.log(movies.map((movie) => movie.toJSON()));
    
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();