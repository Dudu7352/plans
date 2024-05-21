<script lang="ts">
  import type { Entry } from "../types/entry";
  import DayDetailsActivity from "./DayDetailsActivity.svelte";
  import DayDetailsDeadline from "./DayDetailsDeadline.svelte";

  export let entries: Entry[];
</script>

<div class="timeline">
  <h2>Timeline</h2>
  <div class="eventlist">
    {#each entries as entry}
      {#if entry.type === "activity"}
        <DayDetailsActivity activity={entry} />
      {:else if entry.type === "deadline"}
        <DayDetailsDeadline deadline={entry} />
      {/if}
    {/each}
  </div>
</div>

<style>
  .timeline {
    margin-top: 14pt;
  }

  h2 {
    font-weight: 400;
    font-size: 14pt;
    margin: 0 0 14pt 0;
  }

  .eventlist {
    display: flex;
    flex-direction: column;
    gap: 7pt
  }
</style>
