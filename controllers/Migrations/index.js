const Users = require("../../models/Users"),
  users = require("./users"),
  mongoose = require("mongoose");

const migrations = [
  {
    entity: Users,
    collections: users,
    name: "users",
  },
  {
    collections: [],
    name: "products",
  },
  {
    collections: [],
    name: "carts",
  },
  {
    collections: [],
    name: "sales",
  },
  {
    collections: [],
    name: "items",
  },
];

exports.save = (req, res) => {
  migrations.map(migration => {
    mongoose.connection.db.dropCollection(
      migration.name,
      async function (_, result) {
        if (result) {
          if (migration.collections.length > 0) {
            for (let index = 0; index < migration.collections.length; index++) {
              const collection = migration.collections[index];

              await migration.entity.create(collection);
            }
          }
        }
      }
    );
  });

  res.json("Seeder Migrations successfully done...");
};
