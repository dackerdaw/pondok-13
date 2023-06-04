migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("awusgobwenumftw")

  collection.name = "sets"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_fg9Tb1r` ON `sets` (`slug`)",
    "CREATE INDEX `idx_UCH4ve8` ON `sets` (`unit_id`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("awusgobwenumftw")

  collection.name = "groups"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_fg9Tb1r` ON `groups` (`slug`)",
    "CREATE INDEX `idx_UCH4ve8` ON `groups` (`unit_id`)"
  ]

  return dao.saveCollection(collection)
})
