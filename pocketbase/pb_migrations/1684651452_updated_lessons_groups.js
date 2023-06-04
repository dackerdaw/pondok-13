migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jeqcy8yhtoxxiv4")

  collection.options = {
    "query": "SELECT \n  l.id,\n  l.lesson_slug\nFROM lessons l\nLEFT JOIN videos ON l.lesson_slug = videos.slug;"
  }

  // remove
  collection.schema.removeField("kxxyv2we")

  // remove
  collection.schema.removeField("1cziauif")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "whd5sore",
    "name": "lesson_slug",
    "type": "text",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("jeqcy8yhtoxxiv4")

  collection.options = {
    "query": "SELECT \n  l.id,\n  l.lesson_slug,\n  l.lesson_type\nFROM lessons l;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kxxyv2we",
    "name": "lesson_slug",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1cziauif",
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

  // remove
  collection.schema.removeField("whd5sore")

  return dao.saveCollection(collection)
})
