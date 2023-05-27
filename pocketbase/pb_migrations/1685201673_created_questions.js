migrate((db) => {
  const collection = new Collection({
    "id": "hldxrdoedu9tn38",
    "created": "2023-05-27 15:34:33.783Z",
    "updated": "2023-05-27 15:34:33.783Z",
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
            "options"
          ]
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "ujiyxjqz",
        "name": "markdown_props",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "kgmvkmee",
        "name": "hints",
        "type": "editor",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "vmkyawnm",
        "name": "answer",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
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
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38");

  return dao.deleteCollection(collection);
})
