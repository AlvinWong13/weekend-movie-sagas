const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const sqlText = `SELECT * FROM "genres";`;
  pool.query(sqlText)
    .then(response => {
      res.send(response.rows);
    })
    .catch(err => {
      console.log('Error getting genres',err)
      res.sendStatus(500)
    })
})

module.exports = router;