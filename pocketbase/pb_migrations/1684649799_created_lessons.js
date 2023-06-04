migrate((db) => {
  const collection = new Collection({
    "id": "ava164gr3k134dk",
    "created": "2023-05-21 06:16:38.988Z",
    "updated": "2023-05-21 06:16:38.988Z",
    "name": "lessons",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "es7a8c6y",
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
      },
      {
        "system": false,
        "id": "5utmlwij",
        "name": "index",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "zfen2wwm",
        "name": "lesson_slug",
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
        "id": "2zuwxnns",
        "name": "group_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "awusgobwenumftw",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_sSgiBj6` ON `lessons` (`group_id`)"
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
  const collection = dao.findCollectionByNameOrId("ava164gr3k134dk");

  return dao.deleteCollection(collection);
})
