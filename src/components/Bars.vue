<template>
  <div>
    <b-table class="mainTable" striped hover :items="formattedBars" :fields="fields"></b-table>
  </div>
</template>

<script>
import { computed } from "vue";
import getEventBars from "@/composables/getEventBars";

export default {
  setup() {
    const fields = [
      { key: 'name', label: 'Hely neve', sortable: true},
      { key: 'address', label: 'Cím', sortable: false},
      { key: 'payments', label: 'Fizetési lehetőségek', sortable: false},
      { key: 'link', label: '', sortable: false}
    ];
    const { load, eventBars } = getEventBars();

    load();

    const formattedBars = computed(() => {
      return eventBars.value.map((bar) => {
        const singleBar = { ... eventBars };
        singleBar.name = bar.name;
        singleBar.address = bar.zipCode + ', ' + bar.city + ', ' + bar.street + ' ' + bar.houseNumber;
        singleBar.payments = getPayments(bar.creditCard, bar.szepCard);
        singleBar.link = 'link here';
        return singleBar;
      });
    });

    const getPayments = (creditCard, szepCard) => {
      let paymentOptions = 'készpénz';
      if (creditCard === 1) {
        paymentOptions += ', bankkártya';
      }
      if (szepCard === 1) {
        paymentOptions += ', SZÉP kártya';
      }
      return paymentOptions;
    }

    return { formattedBars, fields };
  }
}
</script>

<style scoped>

</style>