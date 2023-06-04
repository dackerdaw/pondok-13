migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("prg4ez6nencmj6d")

  // remove
  collection.schema.removeField("yejrzwij")

  // add
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j0ledmdj",
    "name": "number_of_questions",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("prg4ez6nencmj6d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yejrzwij",
    "name": "questions",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("tm6puof5")

  // remove
  collection.schema.removeField("j0ledmdj")

  return dao.saveCollection(collection)
})