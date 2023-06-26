migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92q3kwccymbu1fv")

  collection.indexes = []

  // remove
  collection.schema.removeField("anwhykfn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tysm4dor",
    "name": "parent_practice",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "prg4ez6nencmj6d",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
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

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_nJRED3p` ON `problem_types` (`slug`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "anwhykfn",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("tysm4dor")

  // remove
  collection.schema.removeField("f1p9td0p")

  return dao.saveCollection(collection)
})
