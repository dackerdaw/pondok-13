migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jobsga3lifx7azv")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jobsga3lifx7azv")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
})
