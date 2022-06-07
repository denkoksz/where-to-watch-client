<template>
  <div class="middle">
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
import { ref } from "vue";
import getSportEvents from "@/composables/getSportEvents";

export default {

  setup() {
    const items = ref(null);
    const { load } = getSportEvents();

    load();

    items.value = [
      { logo: 'nb1', category: 'Labdarúgás', időpont: '2022-06-14 18:00', link: 'Bars'},
      { logo: 'bl', category: 'Kézilabda', időpont: '2022-06-15 14:00', link: 'Bars'},
      { logo: 'el', category: 'Darts', időpont: '2022-06-15 16:00', link: 'Bars'},
      { logo: 'vb', category: 'Floorball', időpont: '2022-06-16 12:30', link: 'Bars'}
    ];

    return { items };
  }
}
</script>

<style scoped>

</style>