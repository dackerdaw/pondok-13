migrate((db) => {
  const collection = new Collection({
    "id": "jobsga3lifx7azv",
    "created": "2023-05-21 04:40:37.889Z",
    "updated": "2023-05-21 04:40:37.889Z",
    "name": "units",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2k24hqr7",
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
        "id": "fr5ouplr",
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
        "id": "vbtio1em",
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
        "id": "4vptpy6w",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "iv7fkhgy",
        "name": "image",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 2097152,
          "mimeTypes": [
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/gif",
            "image/webp"
          ],
          "thumbs": [],
          "protected": false
        }
      },
      {
        "system": false,
        "id": "28lrlxxm",
        "name": "course_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "sbcw60dhlfyfo7a",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_uIsCq8Z` ON `units` (`slug`)",
      "CREATE INDEX `idx_UFOthbS` ON `units` (`course_id`)"
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jobsga3lifx7azv");

  return dao.deleteCollection(collection);
})
