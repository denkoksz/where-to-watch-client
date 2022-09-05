<template>
  <div class="card">
      {{ bar }}
  </div>
</template>

<script>

import BarsService from "@/composables/BarsService";
import {onMounted, ref} from "vue";

export default {
  props: {
    id: {type: Number, required: true}
  },
  setup(props) {
    const barsService = ref(new BarsService());
    const bar = ref(null);

    onMounted(async () => {
      barsService.value.getBarById(props.id).then(singleBar => {
        bar.value = singleBar;
      });
    });

    return { bar };
  }
}
</script>

<style scoped>

</style>