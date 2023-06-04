migrate((db) => {
  const collection = new Collection({
    "id": "prg4ez6nencmj6d",
    "created": "2023-05-21 05:41:02.113Z",
    "updated": "2023-05-21 05:41:02.113Z",
    "name": "practices",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sambtoto",
        "name": "slug",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "gtcakktj",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "yejrzwij",
        "name": "questions",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_3l5879H` ON `practices` (`slug`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("prg4ez6nencmj6d");

  return dao.deleteCollection(collection);
})
