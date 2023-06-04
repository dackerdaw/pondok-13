migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("awusgobwenumftw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dyovbzx0",
    "name": "child_lessons",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "ava164gr3k134dk",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("awusgobwenumftw")

  // remove
  collection.schema.removeField("dyovbzx0")

  return dao.saveCollection(collection)
})
