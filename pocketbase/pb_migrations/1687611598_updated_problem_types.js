migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92q3kwccymbu1fv")

  collection.listRule = "@request.headers.x_token = \"7zov18Ty5XPiKvZswjafaAaddP6SS4nxqadBk7feiuOInCKX5XxvncjZOlBFFBqOAPlfvoZ63wmLu4toYbjmS0sGRrgzKr0J1sq6DQQO6DlCifdpCBaR4pOgII6TdMxD\""
  collection.viewRule = "@request.headers.x_token = \"7zov18Ty5XPiKvZswjafaAaddP6SS4nxqadBk7feiuOInCKX5XxvncjZOlBFFBqOAPlfvoZ63wmLu4toYbjmS0sGRrgzKr0J1sq6DQQO6DlCifdpCBaR4pOgII6TdMxD\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92q3kwccymbu1fv")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
