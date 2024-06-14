<script lang="ts">
  import { onMount } from "svelte";
  import CalendarPane from "./lib/components/CalendarPane.svelte";
  import DayDetailsPane from "./lib/components/DayDetailsPane.svelte";
  import { getMonth } from "./lib/functions/tauri";
  import { openDay } from "./lib/stores";
  import type { Month } from "./lib/types/month";
  let month: Month | null = null;
  onMount(async () => {
    month = await getMonth(5, 2024);
  });
</script>

<header>header</header>

<main>
  <div></div>
  {#if month}
    <CalendarPane {month} />
  {/if}
  <div>
    {#if $openDay != null}
      <DayDetailsPane />
    {/if}
  </div>
</main>

<style>
  :global(body) {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    margin: 0;
  }

  :global(#app) {
    height: calc(100vh - 2rem);
    padding: 1rem;
    box-sizing: border-box;
  }

  main {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    justify-content: center;
    gap: 28pt;
  }

  main > div {
    height: 100%;
  }
</style>
