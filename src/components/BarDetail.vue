<template>
    <div v-if="bar" class="mt-4">
      <h1>{{ bar.name }}</h1>
      <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left class="mb-3">
        <p>Cím: {{ bar.address }}</p>
        <p>Telefonszám: {{ bar.phone }}</p>
        <p>Email cím: {{ bar.email }}</p>
        <p>Fizetési lehetőségek: {{ bar.payments }}</p>
        <p>Honlap: <a href="#" target="_blank">{{ bar.barLink }}</a> </p>
      </b-card>
  </div>
</template>

<script>

import BarsService from "@/composables/BarsService";
import { onMounted, ref } from "vue";

export default {
  props: {
    id: { type: Number, required: true }
  },
  setup(props) {
    const barsService = ref(new BarsService());
    const bar = ref();

    onMounted(async () => {
      const rawBarResult = await barsService.value.getBarById(props.id);
      bar.value = barsService.value.formatBar(rawBarResult);
    });

    return { bar };
  }
}
</script>

<style scoped>

</style>