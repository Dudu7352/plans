<script lang="ts">
  import { fly } from "svelte/transition";
  import { openDay } from "../stores";
  import { formatDate } from "../functions";
  import IconButton from "./IconButton.svelte";
  import DayTimeline from "./DayTimeline.svelte";
  
  $: date = $openDay?.date;
  $: entries = $openDay?.entries ?? [];
</script>

<div class="main" transition:fly={{x: 400, duration: 500}}>
    <div class="head">
        <IconButton on:click={openDay.close} icon="close" />
        <p>{date ? formatDate(date) : ""}</p>
    </div>
    <DayTimeline {entries} />
</div>

<style>
  .main {
    box-shadow: 0 7pt 14pt #00000020;
    padding: 14pt;
    border-radius: 14pt;
    box-sizing: border-box;
    height: 100%;
  }

  .head {
    display: flex;
    align-items: center;
    gap: 14pt
  }

  .head > p {
    margin: 0;
    font-size: 14pt;
  }
</style>
