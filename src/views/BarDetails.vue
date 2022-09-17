<template>
  <BarDetail :id="barId"/>
  <h1>A helyszínen nézhető következő mérkőzések:</h1>
  <SportEventsTable :barId="barId"/>
</template>

<script>
import BarDetail from "@/components/BarDetail";
import SportEventsTable from "@/components/SportEventsTable";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const barId = route.params.id;

    return { barId };
  },
  components: { SportEventsTable, BarDetail }
}
</script>

<style scoped>

</style>