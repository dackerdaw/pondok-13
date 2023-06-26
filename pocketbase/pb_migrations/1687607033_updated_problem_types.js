migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92q3kwccymbu1fv")

  // remove
  collection.schema.removeField("5mhx6psn")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92q3kwccymbu1fv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5mhx6psn",
    "name": "parent_exercise",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "8vtgo373ntpdga4",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "slug"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
