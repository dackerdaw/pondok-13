import { Task } from "@/app/api/practices/getOrCreatePracticeTask";
import Dexie, { Table } from "dexie";

export class MySubClassedDexie extends Dexie {
    tasks!: Table<Task>;
    
    constructor() {
        super('tasks');
        this.version(1).stores({
            tasks: 'slug'
        });
    }
}

export const db = new MySubClassedDexie();