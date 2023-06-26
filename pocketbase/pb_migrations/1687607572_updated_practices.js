migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("prg4ez6nencmj6d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g6vbdxtp",
    "name": "problem_types",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "92q3kwccymbu1fv",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("prg4ez6nencmj6d")

  // remove
  collection.schema.removeField("g6vbdxtp")

  return dao.saveCollection(collection)
})
