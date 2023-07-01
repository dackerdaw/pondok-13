import Dexie from "dexie";

const database = new Dexie("database");
database.version(1).stores({
  customers: '++id, name, dept',
});

export const customerTable = database.table('customers');

export default database;