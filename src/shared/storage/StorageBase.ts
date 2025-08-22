import type { TimeTracker } from "../../components/TimeTracker/types";

export abstract class StorageBase {
  abstract save(timeTrackers: TimeTracker[]): void;
  abstract load(): TimeTracker[];
}