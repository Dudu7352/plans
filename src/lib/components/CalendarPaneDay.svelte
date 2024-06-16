<script lang="ts">
  import { openDay } from "../stores";
  import type { Day } from "../types/day";

  export let day: Day;

  $: today = day.date.toDateString() == new Date().toDateString();
</script>

<button on:click={() => openDay.open(day)} class:today>
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
    box-sizing: border-box;
    border: none;
  }

  button:hover {
    background-color: #abf2ff;
  }

  button.today {
    border: 1pt #abf2ff solid;
    line-height: 27pt;
  }
</style>
