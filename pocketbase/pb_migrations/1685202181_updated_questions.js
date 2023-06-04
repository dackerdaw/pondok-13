migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  // remove
  collection.schema.removeField("yflb3fsc")

  // remove
  collection.schema.removeField("ujiyxjqz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bfuwhvuk",
    "name": "hints",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kgmvkmee",
    "name": "question",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yflb3fsc",
    "name": "markdown_url",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ujiyxjqz",
    "name": "markdown_props",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("bfuwhvuk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kgmvkmee",
    "name": "hints",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
