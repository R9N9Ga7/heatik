import type { TimeTracker } from "../../components/TimeTracker/types";
import { StorageBase } from "./StorageBase";

class LocalStorageSchema {
  constructor(timeTrackers: TimeTracker[]) {
    this.timeTrackers = timeTrackers;
  }

  version: string = '0';
  timeTrackers: TimeTracker[];
}

export class LocalStorage extends StorageBase {
  save(timeTrackers: TimeTracker[]): void {
    if (!timeTrackers.length)
      return;

    const schema = new LocalStorageSchema(timeTrackers);
    localStorage.setItem(this.ITEM_KEY, JSON.stringify(schema));
  }

  load(): TimeTracker[] {
    const loadedTimeTrackers = localStorage.getItem(this.ITEM_KEY);
    if (!loadedTimeTrackers)
      return [];
    try {
      const schema = JSON.parse(loadedTimeTrackers) as LocalStorageSchema;
      return schema.timeTrackers;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  private readonly ITEM_KEY = 'timeTrackers';
};
