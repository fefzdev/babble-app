import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';

const database = getDatabase();

const db = {
  connectTo: (refPath: string) => ref(database, refPath),

  read: async (refPath: string) => {
    const res = await get(child(ref(database), refPath));
    if (res.exists()) return res.val();
    return null;
  },

  readChild: async (refPath: string, childParam: string) => {
    const path = refPath ? `${refPath}/${childParam}` : childParam;
    const res = await get(child(ref(database), path));
    if (res.exists()) return res.val();
    return null;
  },

  write: async (refPath: string, data: unknown) =>
    await set(ref(database, refPath), data),

  update: async (updates: object) => await update(ref(database), updates),

  delete: async (refPath: string) => await remove(ref(database, refPath)),
};

export default db;
