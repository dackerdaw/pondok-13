migrate((db) => {
  const collection = new Collection({
    "id": "w5f88si0vl41c15",
    "created": "2023-05-21 05:22:34.930Z",
    "updated": "2023-05-21 05:22:34.930Z",
    "name": "videos",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "glvivt8x",
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
        "id": "m6kiancp",
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
        "id": "iko7eko7",
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
        "id": "uzyxbrn8",
        "name": "transcript",
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
        "id": "y15gzixd",
        "name": "video_url",
        "type": "url",
        "required": true,
        "unique": false,
        "options": {
          "exceptDomains": [],
          "onlyDomains": []
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_AvQmiSS` ON `videos` (`slug`)"
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
  const collection = dao.findCollectionByNameOrId("w5f88si0vl41c15");

  return dao.deleteCollection(collection);
})
