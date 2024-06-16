<script lang="ts">
  import { onMount } from "svelte";
  import { MONTHS } from "../consts";
  import type { Month } from "../types/month";
  import CalendarPaneDay from "./CalendarPaneDay.svelte";
  import CalendarPaneHead from "./CalendarPaneHead.svelte";
  import { getMonth } from "../functions/tauri";
  import { fly } from "svelte/transition";

  let month: Month | null = null;
  let year: number = new Date().getFullYear();

  onMount(async () => {
    let currentMonth = new Date().getMonth();
    month = await getMonth(currentMonth, year);
  });

  async function nextMonth() {
    if (month === null) return;
    if (month?.monthId == 11) {
      year++;
      month = await getMonth(0, year);
    } else {
      month = await getMonth(month.monthId+1, year);
    }
  }

  async function previousMonth() {
    if (month === null) return;
    if (month?.monthId == 0) {
      year--;
      month = await getMonth(11, year);
    } else {
      month = await getMonth(month.monthId-1, year);
    }
  }
</script>

{#if month !== null}
  <div class="main" in:fly={{duration: 300}}>
    <CalendarPaneHead
      on:nextmonth={nextMonth}
      on:previousmonth={previousMonth}
      monthName={MONTHS[month.monthId]}
      {year}
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
{/if}

<style>
  .main {
    box-shadow: 0 7pt 14pt #00000020;
    padding: 14pt;
    border-radius: 14pt;
    width: fit-content;
  }

  .days {
    display: grid;
    margin-top: 14pt;
    grid-template-columns: repeat(7, auto);
    grid-template-rows: repeat(6, 1fr);
    gap: 7pt;
  }
</style>
