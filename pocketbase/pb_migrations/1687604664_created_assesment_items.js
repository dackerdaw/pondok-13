migrate((db) => {
  const collection = new Collection({
    "id": "i2pirwhc761ciqd",
    "created": "2023-06-24 11:04:24.806Z",
    "updated": "2023-06-24 11:04:24.806Z",
    "name": "assesment_items",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ln9ei0co",
        "name": "answer_type",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "math-input",
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
        "id": "4jdnetzl",
        "name": "answer",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "acfnnhzz",
        "name": "hints",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "i3nfrvdw",
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
        "id": "jf2mqj4s",
        "name": "extras",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "jcdvpvwm",
        "name": "problem_type_parent",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "92q3kwccymbu1fv",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.headers.x_token = \"7zov18Ty5XPiKvZswjafaAaddP6SS4nxqadBk7feiuOInCKX5XxvncjZOlBFFBqOAPlfvoZ63wmLu4toYbjmS0sGRrgzKr0J1sq6DQQO6DlCifdpCBaR4pOgII6TdMxD\"",
    "viewRule": "@request.headers.x_token = \"7zov18Ty5XPiKvZswjafaAaddP6SS4nxqadBk7feiuOInCKX5XxvncjZOlBFFBqOAPlfvoZ63wmLu4toYbjmS0sGRrgzKr0J1sq6DQQO6DlCifdpCBaR4pOgII6TdMxD\"",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("i2pirwhc761ciqd");

  return dao.deleteCollection(collection);
})
