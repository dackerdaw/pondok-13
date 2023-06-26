migrate((db) => {
  const collection = new Collection({
    "id": "92q3kwccymbu1fv",
    "created": "2023-06-24 10:59:53.407Z",
    "updated": "2023-06-24 10:59:53.407Z",
    "name": "problem_types",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5mhx6psn",
        "name": "parent_exercise",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "8vtgo373ntpdga4",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "slug"
          ]
        }
      },
      {
        "system": false,
        "id": "nsivsodk",
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
        "id": "anwhykfn",
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
        "id": "7nhdwm5n",
        "name": "related_contents",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "ava164gr3k134dk",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_nJRED3p` ON `problem_types` (`slug`)"
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
  const collection = dao.findCollectionByNameOrId("92q3kwccymbu1fv");

  return dao.deleteCollection(collection);
})
