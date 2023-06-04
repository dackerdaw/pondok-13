migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6u9oekluvsh4jj9");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "6u9oekluvsh4jj9",
    "created": "2023-05-21 04:07:24.221Z",
    "updated": "2023-05-21 04:08:54.829Z",
    "name": "subjects",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "284d3f97",
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
        "id": "q74dbrlk",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_2A4SQ4v` ON `subjects` (`index`)"
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
