import { invoke } from "@tauri-apps/api";
import type { Month } from "../types/month";
import type { Activity, Deadline, Entry } from "../types/entry";
import type { Day } from "../types/day";

interface RawMonth {
  beginning: number;
  monthId: number;
  days: RawDay[];
}

interface RawDay {
  date: string;
  entries: RawEntry[];
}

type RawEntry = RawActivity | RawDeadline;
type RawActivity = Activity & { from: string; until: string };
type RawDeadline = Deadline & { until: string };

function mapRawEntry(rawEntry: RawEntry): Entry {
  switch (rawEntry.type) {
    case "activity":
      return {
        ...rawEntry,
        from: new Date(rawEntry.from),
        until: new Date(rawEntry.until),
      };
    case "deadline":
      return {
        ...rawEntry,
        until: new Date(rawEntry.until),
      };
  }
}

function mapRawDay(rawDay: RawDay): Day {
  return {
    date: new Date(rawDay.date),
    entries: rawDay.entries.map(mapRawEntry),
  };
}

function mapRawMonth(rawMonth: RawMonth): Month {
  return {
    beginning: rawMonth.beginning,
    monthId: rawMonth.monthId,
    days: rawMonth.days.map(mapRawDay),
  };
}

export async function getMonth(
  month: number,
  year: number
): Promise<Month | null> {
  const rawMonth = await invoke<RawMonth | null>("get_month", { month, year });
  if (rawMonth == null) return null;
  return mapRawMonth(rawMonth);
}

export async function addEntry(entry: Entry): Promise<Entry | null> {
  return await invoke<Entry | null>("add_entry", { entry });
}
