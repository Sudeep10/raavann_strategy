"use client";

import { Dexie, EntityTable } from "dexie";

export interface UserSaved {
  id?: number;
  category: string;
  data: string;
  company: string;
  strategy: string;
  subStrategy: string;
}

export interface Category {
  id?: number;
  name: string;
}

export const db = new Dexie("MyDB") as Dexie & {
  userSaved: EntityTable<UserSaved>;
  categories: EntityTable<Category>;
};

db.version(1).stores({
  userSaved: "++id,category,data",
  categories: "++id,name",
});

db.categories
  .where("name")
  .equals("default")
  .first()
  .then((exists) => {
    if (!exists) {
      db.categories.add({ name: "default" });
    }
  });
