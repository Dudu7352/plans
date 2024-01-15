<script lang="ts">
    let count = 0;
</script>

<h1>Everything Works</h1>
<button on:click={() => count++}>Click Me</button>
<p>You clicked {count} times</p>

<style>
    h1 {
        color: #222;
    }
</style>