const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/:id', (req, res) => {
  const id = req.params.id
  const sqlText = `
    SELECT "movies".title, "movies".poster, "movies".description FROM "movies" 
      WHERE "movies".id = $1;
    `;
  pool.query(sqlText, [id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error', err);
      res.sendStatus(500)
    })
});
// get route to get genres matching movies
router.get('/genre/:id', (req, res) => {
  const id = req.params.id;
  const sqlText = `
      SELECT "genres".name FROM "genres"
      JOIN "movies_genres" ON "genres".id = "movies_genres".genre_id
      JOIN "movies" ON "movies".id = "movies_genres".movie_id
      WHERE "movies".id = $1;
  `;
  pool.query(sqlText, [id])
  .then( response => {
    res.send(response.rows)
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
});
// get route to get movies from DB
router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});
// put router to edit movie information
router.put('/', (req, res) => {
  const updatedMovie = req.body;
  const sqlText = `
  UPDATE movies
  SET "title" = $1,
  "poster" = $2,
  "description" = $3,
  WHERE id = $4;
  `;

const sqlValues = [
  updatedMovie.title,
  updatedMovie.poster,
  updatedMovie.description,
  updatedMovie.id,
];

pool.query(sqlText, sqlValues)
  .then(() => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log('Error updated movie information', err);
    res.sendStatus(500);
  })
})

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;