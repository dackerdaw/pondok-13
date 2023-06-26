migrate((db) => {
  const collection = new Collection({
    "id": "8vtgo373ntpdga4",
    "created": "2023-06-24 10:53:38.992Z",
    "updated": "2023-06-24 10:53:38.992Z",
    "name": "exercise_models",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zdx36js3",
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
        "id": "ftyfmhyk",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_JTQRpvr` ON `exercise_models` (`slug`)"
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
  const collection = dao.findCollectionByNameOrId("8vtgo373ntpdga4");

  return dao.deleteCollection(collection);
})
