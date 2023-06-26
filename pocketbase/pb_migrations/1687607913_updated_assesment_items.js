migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2pirwhc761ciqd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jcdvpvwm",
    "name": "problem_type_parent",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "92q3kwccymbu1fv",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "slug"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2pirwhc761ciqd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jcdvpvwm",
    "name": "problem_type_parent",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "92q3kwccymbu1fv",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
