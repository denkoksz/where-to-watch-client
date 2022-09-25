<template>
  <div>
    <h1>Összes Helyszín</h1>
  </div>

  <Bars :sportEventId="sportEventId"/>
</template>

<script>
import Bars from "@/components/Bars";
import {useRoute} from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const sportEventId = route.params.sportEventId;

    return { sportEventId };
  },
  components: { Bars }
}
</script>

<style scoped>

</style>