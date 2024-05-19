<script lang="ts">
  import type { Day } from "../types/day";

    export let day: Day;
</script>

<div>
    {day.date.getDate()}
</div>

<style>
    div {
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
        font-family: 'inter';
    }
    
    div:hover {
        background-color: #abf2ff;
    }
</style>