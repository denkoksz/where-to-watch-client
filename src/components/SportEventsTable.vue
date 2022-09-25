<template>
  <div class="card">
    <!--    TODO: put the :paginator="true" attribute to the Datatable properties -->
    <DataTable :value="sportEvents" class="p-datatable-sportevents" :rows="10"
      row-hover v-model:filters="filters" filterDisplay="row" :loading="loading"
       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
       :globalFilterFields="['mainCategory', 'country', 'leagueName', 'matchName']" responsiveLayout="scroll">
      <template #header>
          <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Keresés az összes esemény között" style="width: 285px"/>
          </span>
      </template>
      <template #empty>
        Nincs közelgő esemény.
      </template>
      <template #loading>
        Közelgő események betöltése... Kérlek várj...
      </template>

      <Column header="Sportág" filterField="mainCategory" :showFilterMenu="false" style="min-width:14rem">
        <template #body="{data}">
          <span class="image-text">{{data.mainCategory}}</span>
        </template>
        <template #filter="{filterModel,filterCallback}">
          <MultiSelect v-model="filterModel.value" :show-toggle-all="false" @change="filterCallback()" :options="categories" placeholder="Sportág" class="p-column-filter" display="chip">
            <template #option="slotProps">
              <div class="p-multiselect-representative-option">
                <span class="image-text">{{slotProps.option}}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column field="eventDate" header="Időpont" sortable style="min-width: 14rem">
        <template #body="{data}">
          {{data.eventDate}}
        </template>
      </Column>
      <Column header="Bajnokság" filterField="leagueName" :showFilterMenu="false" sortable style="min-width: 14rem">
        <template #body="{data}">
          <span class="image-text">{{data.leagueName}}</span>
        </template>
        <template #filter="{filterModel,filterCallback}">
          <MultiSelect v-model="filterModel.value" :show-toggle-all="false" @change="filterCallback()" :options="leagues" placeholder="Bajnokság" class="p-column-filter" display="chip">
            <template #option="slotProps">
              <div class="p-multiselect-representative-option">
                <span class="image-text">{{slotProps.option}}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column field="matchName" header="Esemény" style="min-width: 14rem">
        <template #body="{data}">
          {{data.matchName}}
        </template>
      </Column>
      <Column filterField="country" header="Ország" :showFilterMenu="false" sortable style="min-width: 14rem">
        <template #body="{data}">
          <span class="image-text">{{data.country}}</span>
        </template>
        <template #filter="{filterModel,filterCallback}">
          <MultiSelect v-model="filterModel.value" :show-toggle-all="false" @change="filterCallback()" :options="countries" placeholder="Ország" class="p-column-filter" display="chip">
            <template #option="slotProps">
              <div class="p-multiselect-representative-option">
                <span class="image-text">{{slotProps.option}}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
        <template #body="{data}">
          <Button icon="fas" class="p-button-link" @click="handleClick(data.link)">
            <font-awesome-icon :icon="['fas', 'square-arrow-up-right']" />
          </Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import SportEventsService from '@/composables/SportEventsService';
import { onMounted, ref } from "vue";
import { FilterMatchMode } from "primevue/api";

export default {
  props: {
    days: { type: Number, required: false},
    barId: { type: Number, required: false}
  },
  setup(props) {
    const sportEventsService = ref(new SportEventsService());
    const sportEvents = ref();
    const categories = ref([]);
    const leagues = ref([]);
    const countries = ref([]);
    const loading = ref(true);
    const filters = ref({
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'mainCategory': { value: null, matchMode: FilterMatchMode.IN },
      'leagueName': { value: null, matchMode: FilterMatchMode.IN },
      'country': { value: null, matchMode: FilterMatchMode.IN }
    });

    onMounted(async () => {
      sportEventsService.value.getSportEvents(props).then((se) => {
        sportEvents.value = sportEventsService.value.formatMultipleSportEvent(se);
        loading.value = false;
        categories.value = getCategories(se);
        leagues.value = getLeagues(se);
        countries.value = getCountries(se);
      });
    });

    const getCategories = (sportEvents) => {
      let categories = new Set();

      sportEvents.map((sportEvent) => {
        categories.add(sportEvent.mainCategory);
      });

      return categories;
    }

    const getLeagues = (sportEvents) => {
      let leagues = new Set();

      sportEvents.map((sportEvent) => {
        leagues.add(sportEvent.leagueName);
      });

      return leagues;
    }

    const getCountries = (sportEvents) => {
      let countries = new Set();

      sportEvents.map((sportEvent) => {
        countries.add(sportEvent.country);
      });

      return countries;
    }

    const goToSportEventPage = (link) => {
      window.open(link, '_blank');
    };

    return { filters, sportEvents, handleClick: goToSportEventPage, categories, leagues, countries, loading };
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

::v-deep(.p-datatable.p-datatable-sportevents) {
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