const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
// finds all of the tags in the system 
  Tag.findAll({
    include: [
      {
        // the information will the show when searched 
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        // the information will the show when searched 
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(tagData => {
      //error message will show when tag isnt found 
      if (!tagData) {
        res.status(404).json({ message: 'No tag  was found with this id! Try Again!'});
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // this will create a new tag 
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // This is update the tag 
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No tag  was found with this id! Try Again!' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // This will delete the tag 
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({message: 'No tag  was found with this id! Try Again!'});
      return;
    }
    res.json(tagData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
