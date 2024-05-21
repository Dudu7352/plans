<script lang="ts">
  import type { Activity } from "../types/entry";

  export let activity: Activity;
  function getTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
</script>

<div class="activity">
  <p class="name">
    {activity.name}
  </p>
  <p class="time">
    {getTime(activity.from)} - {getTime(activity.until)}
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

  .activity {
    padding: 7pt;
    border-radius: 7pt;
    background-color: #e4eeee;
  }
</style>
