migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "hldxrdoedu9tn38",
    "created": "2023-05-27 15:34:33.783Z",
    "updated": "2023-06-11 22:55:30.931Z",
    "name": "questions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "otx6anau",
        "name": "type",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "number",
            "boolean",
            "string",
            "options",
            "code",
            "interactive-widget"
          ]
        }
      },
      {
        "system": false,
        "id": "vmkyawnm",
        "name": "answer",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "bfuwhvuk",
        "name": "hints",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "j8xa6agg",
        "name": "question",
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
        "id": "0cbzdjij",
        "name": "extras",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "lredmrtr",
        "name": "practice_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "prg4ez6nencmj6d",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_3VVOJjJ` ON `questions` (`practice_id`)"
    ],
    "listRule": "@request.headers.x_token = \"7zov18Ty5XPiKvZswjafaAaddP6SS4nxqadBk7feiuOInCKX5XxvncjZOlBFFBqOAPlfvoZ63wmLu4toYbjmS0sGRrgzKr0J1sq6DQQO6DlCifdpCBaR4pOgII6TdMxD\"",
    "viewRule": "@request.headers.x_token = \"7zov18Ty5XPiKvZswjafaAaddP6SS4nxqadBk7feiuOInCKX5XxvncjZOlBFFBqOAPlfvoZ63wmLu4toYbjmS0sGRrgzKr0J1sq6DQQO6DlCifdpCBaR4pOgII6TdMxD\"",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
