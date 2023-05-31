const Entity = require("../models/carts");

// entity/
exports.browse = (req, res) =>
  Entity.find()
    .populate("productId")
    .isOrdered()
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/save
exports.save = (req, res) =>
  Entity.findOneAndUpdate(
    {
      productId: { $eq: req.body.productId },
      userId: req.body.userId,
    },
    req.body,
    {
      upsert: true,
      new: true,
    }
  )
    .then(item => {
      res.json(item);
    })
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/update
exports.update = (req, res) => {
  Entity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("productId")
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));
};

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.params.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch(error => res.status(400).json({ error: error.message }));
