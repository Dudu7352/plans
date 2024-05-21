<script lang="ts">
  import { openDay } from "../stores";
  import type { Day } from "../types/day";

  export let day: Day;
</script>

<button on:click={() => openDay.open(day)}>
  {day.date.getDate()}
</button>

<style>
  button {
    font-size: 14pt;
    width: 28pt;
    height: 28pt;
    text-align: center;
    line-height: 28pt;
    border-radius: 14pt;
    background-color: #fff;
    transition: background-color 150ms ease-in-out;
    cursor: pointer;
    user-select: none;
    font-family: "inter";
    border: none;
  }

  button:hover {
    background-color: #abf2ff;
  }
</style>
