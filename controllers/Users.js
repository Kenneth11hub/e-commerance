const User = require("../models/Users");

// entity/
exports.browse = (req, res) =>
  User.find()
    .select("-password")
    .then(users =>
      res.json(users.filter(user => user.role.name === req.query.key))
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/find
exports.find = (req, res) =>
  User.findById(req.params.id)
    .select("-password")
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/update
exports.update = (req, res) =>
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .select("-password")
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/destroy
exports.destroy = (req, res) =>
  User.findByIdAndUpdate(
    req.params.id,
    {
      deletedAt: new Date().toLocaleString(),
    },
    { new: true }
  )
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));
