const express = require('express');
const router = express.Router();

//GET USERS
router.get('/', (req,res) => {
  res.status(200).json({

  });
});

//GET USER
router.get('/:id',(req, res) => {

  const id = req.params.id;

  res.status(200).json({
    id
  });
})

module.exports = router;
