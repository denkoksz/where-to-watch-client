<template>
  <div v-if="sportEventId">
    <p>Kiválasztott esemény: {{ sportEvent }}</p>
  </div>
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
import SportEventsService from "@/composables/SportEventsService";

export default {
  props: {
    sportEventId: { type: Number, required: false}
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
      await sportEventsService.value.getSportEventById(props.sportEventId).then((se) => {
        sportEvent.value = formatSportEvent(se);
      });
    });

    const formatSportEvent = (sportEvent) => {
        const event = sportEvent;
        event.mainCategory = capitalizeFirstLetter(sportEvent.mainCategory);
        event.matchName = sportEvent.homeTeamName + ' - ' + sportEvent.awayTeamName;
        event.eventDate = sportEvent.eventDate.replace('T', ' ');
        event.link = getLinkForSportEvent(event.pkEvent);
        return event;
    };

    const getLinkForSportEvent = (id) => {
      return "/sportevents/" + id;
    };

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const goToSportEventPage = (link) => {
      window.open(link, '_blank');
    };

    return { bars, sportEvent, filters, handleClick: goToSportEventPage };
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