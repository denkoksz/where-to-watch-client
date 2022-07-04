<template>
  <div>
    <b-table class="mainTable" striped hover :items="formattedSportEvents" :fields="fields"></b-table>
  </div>
</template>

<script>
import getSportEvents from "@/composables/getSportEvents";
import { computed } from "vue";

export default {
  props: {
    days: { type: Number, required: false},
  },
  setup(props) {
    const fields = [
      { key: 'logo', label: '', sortable: false},
      { key: 'mainCategory', label: 'Kategória', sortable: true, sortDirection: 'asc'},
      { key: 'matchName', label: 'Mérkőzés', sortable: false},
      { key: 'country', label: 'Ország', sortable: true, sortDirection: 'asc'},
      { key: 'eventDate', label: 'Dátum', sortable: true, sortDirection: 'desc'},
      { key: 'link', label: '', sortable: false},
    ];
    const { load, sportEvents } = getSportEvents(props.days);

    load();

    const formattedSportEvents = computed(() => {
      return sportEvents.value.map((sportEvent) => {
        const event = { ... sportEvent };
        event.matchName = event.homeTeamName + ' - ' + event.awayTeamName;
        event.eventDate = event.eventDate.replace('T', ' ');
        event.link = 'link here';
        event.logo = getLogoForSportEvent(event.mainCategory);
        return event;
      });
    });

    const getLogoForSportEvent = (mainCategory) => {
      //find the logo for the main category () firestore?
      //fallback if logo was not found!
    }

    return { formattedSportEvents, fields };
  }
}
</script>

<style scoped>

</style>