var express = require('express');
var router = express.Router();
var db = require('../database.js')
let jwt = require('express-jwt');
// let User = mongoose.model('User');
// let Tab = mongoose.model('Tab');
// let auth = jwt({ secret: process.env.BACKEND_SECRET });

router.get('/', function (req, res, next) {
    db.all("SELECT id, name from Category", function(err, rows) {
        res.send(rows);
    });
});

/* POST category */
router.post('/', function (req, res, next) {

  if ( !req.body.name ) {
    return res.status(400).json(
      { message: 'Please fill out all fields (name)' });
  }

  var data = {
      name: req.body.name,
  }

  db.run("INSERT INTO Category(name) VALUES(?)", [data.name], function(err, result) {
      if (err) { return next(err); }

      res.json({
          "message": "success",
          "data": data,
      })
  })

});

/* PUT category */
router.put('/', function (req, res, next) {

  if ( !req.body.id || !req.body.name ) {
    return res.status(400).json(
      { message: 'Please fill out all fields (id, name)' });
  }

  var data = {
      id: req.body.id,
      name: req.body.name,
  }

  db.run("UPDATE Category SET name = ? WHERE id = ?", [data.name, data.id], function(err, result) {
      if (err) { return next(err); }

      res.json({
          "message": "success",
          "data": data,
      })
  })

});

/* DELETE category */
router.delete('/', function (req, res, next) {

  //Verify if id is appended
  if (!req.body.id) {
    return res.status(400).json(
      { message: 'Please fill in the id' });
  }

  var data = {
      id: req.body.id,
  }

  db.run("DELETE FROM Category WHERE id = ?", [data.id], function(err, result) {
      if (err) { return next(err); }

      res.json({
          "message": "success",
          "data": data,
      })
  })
})

module.exports = router;