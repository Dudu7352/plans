<script lang="ts">
  import type { Deadline } from "../types/entry";

  export let deadline: Deadline;

  function getTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
</script>

<div class="deadline">
  <input type="checkbox" bind:value={deadline.accomplished} />
  <p class="name">
    {deadline.name}
  </p>
  <p class="time">
    Until {getTime(deadline.until)}
  </p>
</div>

<style>
  .name {
    font-size: 14pt;
    margin: 0;
  }

  .time {
    font-size: 10pt;
    color: #000a;
    font-weight: 600;
    margin: 0;
  }

  input[type="checkbox"] {
    grid-row: 1 / 3;
  }

  .deadline {
    padding: 7pt;
    border-radius: 7pt;
    background-color: #eee4e4;
    display: grid;
    grid-template-columns: min-content auto;
    column-gap: 7pt;
  }
</style>
