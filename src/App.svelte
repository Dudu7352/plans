<script lang="ts">
  import CalendarPane from "./lib/components/CalendarPane.svelte";
</script>

<header>header</header>

<main>
  <CalendarPane />
</main>

<style>
  :global(body) {
    height: 100vh;
    width: 100vw;
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>