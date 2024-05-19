<script lang="ts">
  import type { SvgIcon } from "../types/svg_icon";

  export let icon: SvgIcon;
</script>

<button
    on:click
    on:dblclick
>
  {#if icon == "arrow_back"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000"
      ><path
        d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
      /></svg
    >
  {:else if icon == "arrow_forward"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000"
      ><path
        d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"
      /></svg
    >
  {/if}
</button>

<style>
  button {
    width: 28pt;
    height: 28pt;
    border-radius: 14pt;
    padding: 0;
    margin: 0;
    background-color: #fff;
    border: none;
  }

  svg {
    width: 16pt;
    height: 100%;
  }

  button:hover {
    background-color: #eee;
  }

  button:active {
    background-color: #ddd;
  }
</style>
