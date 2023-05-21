migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jeqcy8yhtoxxiv4")

  collection.options = {
    "query": "SELECT \n  l.id,\n  l.lesson_slug,\n  l.lesson_type\nFROM lessons l\nLEFT JOIN videos ON l.lesson_slug = videos.slug\nLEFT JOIN articles ON l.lesson_slug = articles.slug\nLEFT JOIN practices ON l.lesson_slug = practices.slug;"
  }

  // remove
  collection.schema.removeField("skvhbpsl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qthz4qeg",
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
    "id": "ogeid6ac",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jeqcy8yhtoxxiv4")

  collection.options = {
    "query": "SELECT \n  l.id,\n  l.lesson_slug\nFROM lessons l\nLEFT JOIN videos ON l.lesson_slug = videos.slug\nLEFT JOIN articles ON l.lesson_slug = articles.slug\nLEFT JOIN practices ON l.lesson_slug = practices.slug;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "skvhbpsl",
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

  // remove
  collection.schema.removeField("qthz4qeg")

  // remove
  collection.schema.removeField("ogeid6ac")

  return dao.saveCollection(collection)
})
