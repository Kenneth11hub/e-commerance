const Entity = require("../models/Products"),
  fs = require("fs");

// entity/
exports.browse = (req, res) =>
  Entity.find()
    .byFarmer(req.query.key)
    .populate("farmerId", "email fullName")
    .then(products => res.json(products))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:barcode/find
exports.find = (req, res) =>
  Entity.find()
    .byBarcode(req.params.barcode)
    .then(items => {
      const item = items[0];
      if (item) {
        if (item.deletedAt) {
          res.status(400).json({ error: "Item is archived!" });
        } else {
          res.json(item);
        }
      } else {
        res.status(400).json({ error: "Invalid Barcode!" });
      }
    })
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:key/search
exports.search = (req, res) =>
  Entity.find()
    .then(items =>
      res.json(
        items.filter(item => item.name.toLowerCase().includes(req.params.key))
      )
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/save
exports.save = (req, res) =>
  Entity.create(req.body)
    .then(item => {
      let url = `./assets/products`;
      if (!fs.existsSync(url)) {
        fs.mkdirSync(url, { recursive: true });
      }
      try {
        let filename = `${url}/${item._id}.jpg`;
        fs.writeFileSync(filename, req.body.base64, "base64");
      } catch (error) {}
      res.json(item);
    })
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/update
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(
    req.params.id,
    {
      deletedAt: new Date().toLocaleString(),
    },
    { new: true }
  )
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));
