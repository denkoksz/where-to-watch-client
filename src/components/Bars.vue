<template>
    <div class="mt-4" v-if="sportEvent">
        <b-card img-src="https://placekitten.com/250/250" img-alt="Card image" img-left class="mb-3">
          <h2>Kiválasztott esemény</h2>
          <p>Kategória: {{ sportEvent.mainCategory }}</p>
          <p>Ország: {{ sportEvent.country }}</p>
          <p>Bajnokság: {{ sportEvent.leagueName }}</p>
          <p>Mérkőzés: {{ sportEvent.matchName }}</p>
          <p>Időpont: {{ sportEvent.eventDate }} </p>
        </b-card>
    </div>
  <div class="card">
    <DataTable :value="bars" class="p-datatable-bars" :rows="10" :paginator="true"
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
import SportEventsService from "@/composables/SportEventsService";

export default {
  props: {
    sportEventId: { type: Number, required: false }
  },
  setup(props) {
    const barsService = ref(new BarsService());
    const sportEventsService = ref(new SportEventsService());
    const bars = ref();
    const sportEvent = ref();
    const loading = ref(true);
    const filters = ref({
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    onMounted(async () => {
      await barsService.value.getBars(props.sportEventId).then((bar) => {
        bars.value = barsService.value.formatMultipleBars(bar);
        loading.value = false;
      });

      if(props.sportEventId) {
        await sportEventsService.value.getSportEventById(props.sportEventId).then((se) => {
          sportEvent.value = sportEventsService.value.formatSingleSportEvent(se);
        });
      }
    });

    return { bars, sportEvent, filters };
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