<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let monthName: string;
</script>

<div class="head">
  <button on:click={() => dispatch("nextmonth")}>⬅️</button>
  <span>
    {monthName}
  </span>
  <button on:click={() => dispatch("previousmonth")}>➡️</button>
</div>

<style>
  .head {
    display: grid;
    grid-template-columns: min-content auto min-content;
  }

  button {
    width: 28pt;
    height: 28pt;
    font-size: 14pt;
    line-height: 28pt;
    border-radius: 14pt;
    padding: 0;
    margin: 0;
    background-color: #fff;
    border: none;
  }

  button:hover {
    background-color: #eee;
  }

  button:active {
    background-color: #ddd;
  }

  .head > span {
    font-size: 24pt;
    font-family: 'Inter';
    text-align: center;
  }
</style>
