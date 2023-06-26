migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92q3kwccymbu1fv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f1p9td0p",
    "name": "assesment_items",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "i2pirwhc761ciqd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92q3kwccymbu1fv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f1p9td0p",
    "name": "assesment_items",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "i2pirwhc761ciqd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "problem_type_parent"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
