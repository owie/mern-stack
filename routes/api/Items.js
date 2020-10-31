const express = require('express');
const router = express.Router();
// const auth = require('../../middleware/auth');

//  Item Model
const Item = require('../../models/Item');
/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 }) // descending
    .then(items => res.json(items))
});


/**
 * @route   SEARCH api/items
 * @desc    Set All Items
 * @access  Public
 */

router.get('/search', (req, res) => {
  const { name } = req.body;
  Item.find({ 'name': { '$regex': name, '$options': 'i' }})
    .then(items => res.json(items))
    .catch(err => console.log(err))
});

/**
 * @route   POST api/items
 * @desc    reate An Item
 * @access  Public
 */
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    price: req.body.price
  });

  newItem.save()
    .then(item => res.json(item))
});

/**
 * @route   DELETE api/items/:id
 * @desc    Delete An Item
 * @access  Public
 */
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
});

module.exports = router;