<template>
  <div>
    <h1>Üdv a hol nézzem oldalon!</h1>
  </div>
  <div>
    <h2>Közelgő események</h2>
  </div>
    <SportEventsTable :days="3"/>
</template>

<script>
import SportEventsTable from "@/components/SportEventsTable";
export default {
  components: { SportEventsTable }
}
</script>

<style scoped>

</style>