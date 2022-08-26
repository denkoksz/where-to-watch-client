<template>
  <div>
    <!--    TODO: put the :paginator="true" attribute to the Datatable properties -->
    <DataTable :value="sportEvents" class="p-datatable-sportevents" :rows="10"
      row-hover="true" v-model:filters="filters" filterDisplay="menu" :loading="loading"
       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
       :globalFilterFields="['mainCategory', 'country', 'leagueName', 'matchName']" responsiveLayout="scroll">
      <template #header>
        <div>
          <h5 class="m-2">Események</h5>
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Keresés az események között" style="width: 250px"/>
            </span>
        </div>
      </template>
      <template #empty>
        Nincs közelgő esemény.
      </template>
      <template #loading>
        Közelgő események betöltése... Kérlek várj...
      </template>
      <Column field="mainCategory" header="Kategoria" sortable style="min-width: 14rem">
        <template #body="{data}">
          {{data.logo}}
        </template>
      </Column>
      <Column field="country" header="Ország" sortable style="min-width: 14rem">
        <template #body="{data}">
          {{data.country}}
        </template>
        <template #filter="{filterModel}">
          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by country"/>
        </template>
      </Column>
      <Column field="leagueName" header="Bajnokság" sortable style="min-width: 14rem">
        <template #body="{data}">
          {{data.leagueName}}
        </template>
        <template #filter="{filterModel}">
          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by league"/>
        </template>
      </Column>
      <Column field="matchName" header="Esemény" sortable style="min-width: 14rem">
        <template #body="{data}">
          {{data.matchName}}
        </template>
      </Column>
      <Column field="eventDate" header="Időpont" sortable style="min-width: 14rem">
        <template #body="{data}">
          {{data.eventDate}}
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
  },
  setup(props) {
    const sportEventsService = ref(new SportEventsService());
    const sportEvents = ref();

    onMounted(async () => {
      sportEvents.value = sportEventsService.value.getSportEvents(props.days).then((se) => {
        sportEvents.value = formatSportEvent(se);
      });
    });

    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const getLogoForSportEvent = (mainCategory) => {
      //find the logo for the main category () firestore?
      //fallback if logo was not found!
      return mainCategory;
    }
    const formatSportEvent = (sportEvents) => {
      return sportEvents.map((sportEvent) => {
        const event = sportEvent;
        event.matchName = sportEvent.homeTeamName + ' - ' + sportEvent.awayTeamName;
        event.eventDate = sportEvent.eventDate.replace('T', ' ');
        event.link = getLinkForSportEvent(sportEvent);
        event.logo = getLogoForSportEvent(sportEvent.mainCategory);
        return event;
      });
    };

    const goToSportEventPage = (link) => {
      window.open(link, '_blank');
    }

    const getLinkForSportEvent = (sportEvent) => {
      return "https://www.google.com";
    }

    return { filters, sportEvents, handleClick: goToSportEventPage };
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