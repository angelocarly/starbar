var express = require('express');
var router = express.Router();
var db = require('../database.js')
let jwt = require('express-jwt');
// let User = mongoose.model('User');
// let Tab = mongoose.model('Tab');
// let auth = jwt({ secret: process.env.BACKEND_SECRET });

router.get('/', function (req, res, next) {
    res.send('test')
});

// //GET tab by id
// router.get('/:tab', function (req, res, next) {
//   res.json(req.tab);
// })


// //DELETE tab
// router.delete('/:id', auth, function (req, res, next) {

//   //Verify if id is appended
//   if (!req.params.id) {
//     return res.status(400).json(
//       { message: 'Please fill in the id' });
//   }

//   //Verify if id is a valid ObjectId
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({message: 'Failed to convert id to a MongoDB id'})
//   }

//   //Try to delete the tab
//   Tab.deleteOne(
//     //Delete a tab with the tab id and the author id
//     { _id: req.params.id, author: req.user._id},
//     function (err, result) {
//       if (err) return res.status(400).send(err);

//       //No tabs were deleted
//       if (result.n === 0) return res.status(400).json({ message: `Could not remove tab because it doesn't exist or is not owned by this user.` })

//       //Success
//       return res.sendStatus(200)
//     })
// })


// router.param('tab', function (req, res, next, id) {
//   let query = Tab.findById(id);
//   query.exec(function (err, tab) {
//     if (err) {
//       return next(err);
//     }
//     if (!tab) {
//       return next(new Error('not found ' + id));
//     }
//     req.tab = tab;
//     return next();
//   });
// });

module.exports = router;