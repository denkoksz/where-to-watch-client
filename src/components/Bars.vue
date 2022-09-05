<template>
  <div class="card">
    <DataTable :value="bars" class="p-datatable-bars" :rows="10"
               row-hover v-model:filters="filters" filterDisplay="row" :loading="loading"
               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
               :globalFilterFields="['name', 'address', 'payments']" responsiveLayout="scroll">
      <template #header>
          <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Keresés az összes helyszín között" style="width: 285px"/>
          </span>
      </template>
      <template #empty>
        Nincs megjeleníthető helyszín.
      </template>
      <template #loading>
        Helszínek betöltése... Kérlek várj...
      </template>
      <Column field="name" header="Helyszín" sortable style="min-width: 14rem">
        <template #body="{data}">
          {{data.name}}
        </template>
      </Column>
      <Column field="address" header="Cím" sortable style="min-width: 14rem">
        <template #body="{data}">
          {{data.address}}
        </template>
      </Column>
      <Column field="payments" header="Fizetési lehetőségek" sortable style="min-width: 14rem">
        <template #body="{data}">
          {{data.payments}}
        </template>
      </Column>
      <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
        <template #body="{data}">
          <router-link :to="{ name: 'barDetails', params: { id: data.pkBar }}">
            <Button icon="fas" class="p-button-link">
              <font-awesome-icon :icon="['fas', 'square-arrow-up-right']" />
            </Button>
          </router-link>
        </template>
      </Column>

    </DataTable>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import BarsService from "@/composables/BarsService";
import { FilterMatchMode } from "primevue/api";

export default {
  setup() {
    const barsService = ref(new BarsService());
    const bars = ref();
    const loading = ref(true);
    const filters = ref({
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    onMounted(() => {
      bars.value = barsService.value.getBars().then((bar) => {
        bars.value = formatBar(bar);
        loading.value = false;
      });
    });

    const formatBar = (bars) => {
      return bars.map((bar) => {
        const formattedBar = bar;
        formattedBar.address = bar.zipCode + ', ' + bar.city + ', ' + bar.street + ' ' + bar.houseNumber;
        formattedBar.payments = getPayments(bar.creditCard, bar.szepCard);
        formattedBar.link = getLinkForBar(bar);
        return formattedBar;
      });
    };

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

    const getLinkForBar = (bar) => {
      return "https://www.google.com";
    };

    const goToSportEventPage = (link) => {
      window.open(link, '_blank');
    };

    return { bars, filters, handleClick: goToSportEventPage };
  }
}
</script>

<style lang="scss" scoped>
@import "~primevue/resources/themes/saga-blue/theme.css";
@import "~primevue/resources/primevue.min.css";
@import "~primeicons/primeicons.css";

img {
  vertical-align: middle;
}
::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}

::v-deep(.p-progressbar) {
  height: .5rem;
  background-color: #D8DADC;

  .p-progressbar-value {
    background-color: #607D8B;
  }
}

::v-deep(.p-datepicker) {
  min-width: 25rem;

  td {
    font-weight: 400;
  }
}

::v-deep(.p-datatable.p-datatable-bars) {
  .p-datatable-header {
    padding: 1rem;
    text-align: left;
    font-size: 1.5rem;
  }

  .p-paginator {
    padding: 1rem;
  }

  .p-datatable-thead > tr > th {
    text-align: left;
  }

  .p-datatable-tbody > tr > td {
    cursor: auto;
  }

  .p-dropdown-label:not(.p-placeholder) {
    text-transform: uppercase;
  }
}
</style>