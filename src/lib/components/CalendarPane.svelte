<script lang="ts">
  import { MONTHS } from "../consts";
  import type { Month } from "../types/month";
  import CalendarPaneDay from "./CalendarPaneDay.svelte";
  import CalendarPaneHead from "./CalendarPaneHead.svelte";

  export let month: Month;
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
    width: fit-content;
  }

  .days {
    display: grid;
    margin-top: 14pt;
    grid-template-columns: repeat(7, auto);
    gap: 7pt;
  }
</style>
