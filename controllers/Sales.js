const Entity = require("../models/Sales"),
  Items = require("../models/Items"),
  Carts = require("../models/carts"),
  fs = require("fs"),
  Products = require("../models/Products");

// entity/
exports.browse = (req, res) =>
  Entity.find()
    .populate("userId")
    .then(async sales => {
      var _sales = sales.filter(
        sale =>
          new Date(sale.createdAt).getMonth() === Number(req.query.month) &&
          new Date(sale.createdAt).getFullYear() === Number(req.query.year) &&
          (String(req.query.id) === "63aa7bd042b1e0d90e533f35" ||
            String(sale.farmerId) === String(req.query.id) ||
            String(sale.userId._id) === String(req.query.id))
      );
      res.json(_sales);
    })
    .catch(error => res.status(400).json({ error: error.message }));

// entity/
exports.overview = (req, res) =>
  Entity.find()
    .byFarmer(req.query.id)
    .then(sales => {
      const handleOverview = collections => {
        const years = Array.from(
          new Set(
            collections.map(collection =>
              new Date(collection.createdAt).getFullYear()
            )
          )
        );

        const _year = collections.filter(
          collection =>
            Number(req.query.year) ===
            new Date(collection.createdAt).getFullYear()
        );

        const _months = Array.from(
          new Set(
            _year.map(yr =>
              new Date(yr.createdAt).toLocaleString("default", {
                month: "long",
              })
            )
          )
        );

        const data = _months
          .map(month =>
            _year.filter(
              yr =>
                new Date(yr.createdAt).toLocaleString("default", {
                  month: "long",
                }) === month
            )
          )
          .map(_statistic =>
            _statistic.reduce((total, item) => total + item.total, 0)
          );

        return {
          category: _months,
          data,
          years,
        };
      };

      res.json(handleOverview(sales));
    })
    .catch(error => res.status(400).json({ error: error.message }));

// entity/
exports.statistics = (req, res) =>
  Entity.find()
    .byFarmer(req.query.id)
    .byStatus("delivered")
    .then(sales =>
      Items.find()
        .populate("productId")
        .then(items => {
          const _today = new Date();

          const handleDemands = collections => {
            const _items = Array.from(
              new Set(
                collections.map(collection => String(collection.productId?._id))
              )
            );

            var _statistics = _items
              .map(_item =>
                collections.filter(
                  collection => String(collection.productId?._id) === _item
                )
              )
              .map(_statistic =>
                _statistic.reduce((total, item) => total + item.quantity, 0)
              );

            var newArr = [];

            for (let index = 0; index < _statistics.length; index++) {
              newArr.push({
                [_items[index]]: _statistics[index],
              });
            }

            newArr = newArr
              .sort((a, b) => b[Object.keys(b)[0]] - a[Object.keys(a)[0]])
              .splice(0, 5);

            var category = [],
              data = [];

            newArr.map(obj => {
              const _product = collections.find(
                collection =>
                  Object.keys(obj)[0] === String(collection.productId?._id)
              );

              category.push(_product.productId?.name);
              data.push(obj[Object.keys(obj)[0]]);
            });

            return {
              category,
              data,
            };
          };

          const handleMonthly = (collections, days) => {
            const _months = Array.from(
              new Set(
                days.map(
                  day =>
                    `${new Date(day).getMonth()}-${new Date(day).getFullYear()}`
                )
              )
            );

            var _statistics = _months
              .map(_month =>
                collections.filter(
                  collection =>
                    `${new Date(collection.createdAt).getMonth()}-${new Date(
                      collection.createdAt
                    ).getFullYear()}` === _month
                )
              )
              .map(_statistic =>
                _statistic.reduce((total, item) => total + item.total, 0)
              );

            const _average =
              _statistics.reduce((total, item) => total + item, 0) /
              _statistics.length;

            return {
              average: { value: _average, months: _months.length },
            };
          };

          const handleStatistics = (collections, items) => {
            // Get the available labels for this task
            const _days = Array.from(
              new Set(
                collections.map(collection =>
                  new Date(collection.createdAt).toDateString()
                )
              )
            );

            // Arrange the data for the available labels
            var _statistics = _days
              .map(_day =>
                collections.filter(
                  collection =>
                    new Date(collection.createdAt).toDateString() === _day
                )
              )
              .map(_statistic =>
                _statistic.reduce((total, item) => total + item.total, 0)
              );

            if (!_days.find(_day => _day === _today.toDateString())) {
              _days.push(_today.toDateString());
              _statistics.push(0);
            }

            const _average =
              _statistics.reduce((total, item) => total + item, 0) /
              _statistics.length;

            return {
              daily: {
                average: { value: _average, days: _days.length },
                sale: {
                  value: _statistics[_statistics.length - 1],
                  previous: _statistics[_statistics.length - 2],
                },
              },
              monthly: handleMonthly(collections, _days),
              demands: handleDemands(items),
            };
          };

          res.json(handleStatistics(sales, items));
        })
        .catch(error => res.status(400).json({ error: error.message }))
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/find
exports.find = (req, res) =>
  Entity.findById(req.params.id.split("-")[0])
    .populate("userId")
    .populate("farmerId")
    .then(sale =>
      Items.find()
        .bySaleId(sale._id)
        .populate("productId")
        .then(items => {
          var _items = items.filter(
            item =>
              item.productId.farmerId._id !== req.params.id.split("-")[1] &&
              item.status !== "delivered"
          );
          const newObj = { ...sale };
          newObj._doc.items = _items;
          res.json(newObj._doc);
        })
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/save
exports.save = (req, res) => {
  const { products, total, status, userId, base64, isCod, farmers } = req.body;
  // edit the throw data [0:{farmerId, products}]
  farmers.map(pr => {
    console.log(pr);
    Entity.create({ total, status, userId, isCod, farmerId: pr })
      .then(async item => {
        if (!isCod) {
          let url = `./assets/prof`;
          if (!fs.existsSync(url)) {
            fs.mkdirSync(url, { recursive: true });
          }
          try {
            let filename = `${url}/${item._id}.jpg`;
            fs.writeFileSync(filename, base64, "base64");
          } catch (error) {}
        }
        var newArr = [];

        products.map(async product => {
          const newObj = { ...product };
          newObj.saleId = item._id;
          await newArr.push(newObj);
          await Products.findOne({ _id: newObj.productId }).then(async p => {
            var _stock = Number(p.stock) - Number(newObj.quantity);
            await Products.findOneAndUpdate(
              { _id: newObj.productId },
              {
                stock: _stock,
              },
              { new: true }
            );
          });
          await Carts.findByIdAndUpdate(
            product.id,
            { isOrdered: true },
            { new: true }
          );
        });

        if (newArr.length > 1) {
          await Items.insertMany(newArr);
        } else {
          await Items.create(newArr[0]);
        }
      })
      .catch(error => res.status(400).json({ error: error.message }));
  });
  res.json(products);
};

// entity/:id/update
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("userId")
    .then(async item => {
      await Items.updateMany({ saleId: item._id }, req.body, {
        upsert: true,
        new: true,
      });
      res.json(item);
    })
    .catch(error => res.status(400).json({ error: error.message }));

// entity/
exports.sales = (req, res) => {
  Entity.find()
    .byFarmer(req.params.id)
    .populate("userId", "email fullName")
    .then(products => res.json(products))
    .catch(error => res.status(400).json({ error: error.message }));
};
// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.params.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch(error => res.status(400).json({ error: error.message }));
