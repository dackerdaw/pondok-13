migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sbcw60dhlfyfo7a")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sbcw60dhlfyfo7a")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
})
