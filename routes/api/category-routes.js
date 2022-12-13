const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    // find all categories
    // be sure to include its associated Products
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }
      ]
    })
    res.status(200).json(categoryData)

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }]
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!'})
    }

    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new category
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory)

  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const newCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    )
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(deleteCategory)
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
