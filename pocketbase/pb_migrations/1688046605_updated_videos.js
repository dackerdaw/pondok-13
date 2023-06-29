migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5f88si0vl41c15")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "whai70za",
    "name": "external_video_id",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5f88si0vl41c15")

  // remove
  collection.schema.removeField("whai70za")

  return dao.saveCollection(collection)
})
