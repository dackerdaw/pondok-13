migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ava164gr3k134dk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "es7a8c6y",
    "name": "lesson_type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "video",
        "artikel",
        "latihan",
        "kuis",
        "tes"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ava164gr3k134dk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "es7a8c6y",
    "name": "lesson_type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "video",
        "article",
        "practice",
        "quiz",
        "test"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
