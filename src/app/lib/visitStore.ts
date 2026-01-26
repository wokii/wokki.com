import { promises as fs } from "fs";
import path from "path";

type VisitRecord = {
  email: string;
  name: string | null;
  count: number;
  firstVisit: string;
  lastVisit: string;
  lastPath: string;
};

type VisitStore = {
  updatedAt: string;
  records: Record<string, VisitRecord>;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_PATH = path.join(DATA_DIR, "visit-counts.json");
const EMPTY_STORE: VisitStore = {
  updatedAt: new Date(0).toISOString(),
  records: {},
};

let memoryStore: VisitStore | null = null;
let writeQueue: Promise<void> = Promise.resolve();

const loadStore = async () => {
  if (memoryStore) {
    return memoryStore;
  }

  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    const parsed = JSON.parse(raw) as VisitStore;
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Invalid visit store.");
    }
    memoryStore = {
      updatedAt: parsed.updatedAt ?? EMPTY_STORE.updatedAt,
      records: parsed.records ?? {},
    };
    return memoryStore;
  } catch {
    memoryStore = { ...EMPTY_STORE };
    return memoryStore;
  }
};

const persistStore = async (store: VisitStore) => {
  memoryStore = store;

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch (error) {
    console.warn("Visit store write failed.", error);
  }
};

const enqueueWrite = async <T>(task: () => Promise<T>): Promise<T> => {
  const next = writeQueue.then(task, task);
  writeQueue = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
};

export const incrementVisit = async ({
  email,
  name,
  path: visitPath,
}: {
  email: string;
  name: string | null;
  path: string;
}) =>
  enqueueWrite(async () => {
    const store = await loadStore();
    const now = new Date().toISOString();
    const key = email.toLowerCase();
    const existing = store.records[key];

    const record: VisitRecord = {
      email: key,
      name: name ?? existing?.name ?? null,
      count: (existing?.count ?? 0) + 1,
      firstVisit: existing?.firstVisit ?? now,
      lastVisit: now,
      lastPath: visitPath,
    };

    const nextStore: VisitStore = {
      updatedAt: now,
      records: {
        ...store.records,
        [key]: record,
      },
    };

    await persistStore(nextStore);
    return record;
  });

export const getVisitSummary = async (email: string) => {
  const store = await loadStore();
  return store.records[email.toLowerCase()] ?? null;
};
