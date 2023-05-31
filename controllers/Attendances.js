const Entity = require("../models/Attendances"),
  User = require("../models/Users");

// entity/
exports.browse = (req, res) =>
  Entity.find()
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/find
exports.find = (req, res) =>
  Entity.find()
    .byUser(req.params.id)
    .then(items =>
      User.findById(req.params.id)
        .select("-password")
        .then(user => res.json({ attendances: items, user: user || {} }))
        .catch(error => res.status(400).json({ error: error.message }))
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/logout
exports.logout = (req, res) =>
  Entity.find()
    .byUser(req.params.id)
    .then(() => res.json("Success"))
    .catch(error => res.status(400).json({ error: error.message }));
