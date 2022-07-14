const express = require('express');
const faker = require('faker');

const router = express.Router();

//GET USERS
router.get('/',(req, res) => {
  res.status(200).json({

  });
})

//GET CATEGORY
router.get('/:id',(req, res) => {

  const id = req.params.id;

  res.status(200).json({
    id
  });
})

module.exports = router;
