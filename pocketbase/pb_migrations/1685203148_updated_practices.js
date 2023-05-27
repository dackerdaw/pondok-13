migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("prg4ez6nencmj6d")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tm6puof5",
    "name": "related_lessons",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "ava164gr3k134dk",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id",
        "lesson_slug",
        "lesson_type"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("prg4ez6nencmj6d")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tm6puof5",
    "name": "related_lessons",
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
})
