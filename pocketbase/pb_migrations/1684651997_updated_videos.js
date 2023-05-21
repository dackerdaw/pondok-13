migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5f88si0vl41c15")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5f88si0vl41c15")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
})
