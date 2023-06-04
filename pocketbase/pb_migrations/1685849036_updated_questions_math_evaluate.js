migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  collection.name = "questions"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  collection.name = "questions_math_evaluate"

  return dao.saveCollection(collection)
})
