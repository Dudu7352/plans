import { writable } from "svelte/store";
import type { Day } from "./types/day";

function createOpenDayStore() {
  const { subscribe, set, update } = writable<Day | null>(null);
  let isSet = false;

  return {
    subscribe,
    open: (day: Day) => {
      if (isSet) update(() => day);
      else set(day);
      isSet = true;
      console.log(day);
    },
    close: () => {
      isSet = false;
      set(null);
    },
  };
}

export const openDay = createOpenDayStore();
