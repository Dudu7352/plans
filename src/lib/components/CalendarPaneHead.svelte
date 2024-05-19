<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import IconButton from "./IconButton.svelte";
  const dispatch = createEventDispatcher();
  export let monthName: string;
</script>

<div class="head">
  <IconButton on:click={() => dispatch("nextmonth")} icon="arrow_back"/>
  <span>
    {monthName}
  </span>
  <IconButton on:click={() => dispatch("previousmonth")} icon="arrow_forward" />
</div>

<style>
  .head {
    display: grid;
    grid-template-columns: min-content auto min-content;
  }

  .head > span {
    font-size: 24pt;
    font-family: 'Inter';
    text-align: center;
  }
</style>
