migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  collection.indexes = [
    "CREATE INDEX `idx_3VVOJjJ` ON `questions` (`practice_id`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  collection.indexes = []

  return dao.saveCollection(collection)
})
