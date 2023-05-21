migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jeqcy8yhtoxxiv4")

  collection.options = {
    "query": "SELECT \n  l.id,\n  l.lesson_slug\nFROM lessons l\nLEFT JOIN videos ON l.lesson_slug = videos.slug\nLEFT JOIN articles ON l.lesson_slug = articles.slug\nLEFT JOIN practices ON l.lesson_slug = practices.slug;"
  }

  // remove
  collection.schema.removeField("whd5sore")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jeqcy8yhtoxxiv4")

  collection.options = {
    "query": "SELECT \n  l.id,\n  l.lesson_slug\nFROM lessons l\nLEFT JOIN videos ON l.lesson_slug = videos.slug;"
  }

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

  // remove
  collection.schema.removeField("skvhbpsl")

  return dao.saveCollection(collection)
})
