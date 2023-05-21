migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jeqcy8yhtoxxiv4");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "jeqcy8yhtoxxiv4",
    "created": "2023-05-21 06:38:00.675Z",
    "updated": "2023-05-21 06:46:19.947Z",
    "name": "lessons_groups",
    "type": "view",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n  l.id,\n  l.lesson_slug,\n  l.lesson_type\nFROM lessons l\nLEFT JOIN videos ON l.lesson_slug = videos.slug\nLEFT JOIN articles ON l.lesson_slug = articles.slug\nLEFT JOIN practices ON l.lesson_slug = practices.slug;"
    }
  });

  return Dao(db).saveCollection(collection);
})
