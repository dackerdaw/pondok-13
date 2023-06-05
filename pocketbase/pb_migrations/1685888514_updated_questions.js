migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "otx6anau",
    "name": "type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "number",
        "boolean",
        "string",
        "options",
        "code",
        "interactive-widget"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "otx6anau",
    "name": "type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "number",
        "boolean",
        "string",
        "options",
        "code",
        "graphical"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
