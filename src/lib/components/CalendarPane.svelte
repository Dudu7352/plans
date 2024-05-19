<script lang="ts">
  import { MONTHS } from "../consts";
  import type { Day } from "../types/day";
  import type { Month } from "../types/month";
  import CalendarPaneDay from "./CalendarPaneDay.svelte";
  import CalendarPaneHead from "./CalendarPaneHead.svelte";

  function getDaysInMonth(year: number, month: number) {
    let days: Day[] = [];
    // Month is zero-based, so January is 0, February is 1, etc.
    let date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      days.push({
        date: new Date(date),
        entries: [],
      }); // Clone the date object to avoid reference issues
      date.setDate(date.getDate() + 1); // Move to the next day
    }

    return days;
  }

  const defaultMonth: Month = {
    beginning: 2,
    monthId: 4,
    days: getDaysInMonth(2024, 4),
  };

  export let month: Month = defaultMonth;
</script>

<div class="main">
  <CalendarPaneHead 
    on:nextmonth={() => {}}
    on:previousmonth={() => {}}
    monthName={MONTHS[month.monthId]}
  />
  <div class="days">
    {#if month.beginning > 0}
      <div style={`grid-column: 1 / ${month.beginning + 1}`}></div>
    {/if}
    {#each month.days as day}
      <CalendarPaneDay {day} />
    {/each}
  </div>
</div>

<style>
  .main {
    box-shadow: 0 7pt 14pt #00000020;
    padding: 14pt;
    border-radius: 14pt;
  }

  .days {
    display: grid;
    margin-top: 14pt;
    grid-template-columns: repeat(7, auto);
    gap: 7pt;
  }
</style>
