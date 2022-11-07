<template>
  <div v-if="alreadyCreated">
    <p></p>
  </div>
  <div>
    <h1>Új esemény létrehozása</h1>
    <!--TODO: dropdown list ugy mukodjon, hogy szukitse a talalatokat ahhoz kepest, ami ki lett valasztva-->
      <div>
        <h5>Sportág</h5>
        <Dropdown v-model="sportCategory" :options="sportCategories" optionLabel="name" @change="onChangeCategory" :filter="true" placeholder="Válassz sportágat" :showClear="true">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{slotProps.value.name}}</div>
            </div>
            <span v-else>
                    {{slotProps.placeholder}}
                </span>
          </template>
          <template #option="slotProps">
            <div>
              <div>{{slotProps.option.name}}</div>
            </div>
          </template>
        </Dropdown>

        <h5>Ország</h5>
        <Dropdown v-model="country" :options="countries" optionLabel="name"  @change="onChangeCountry" :filter="true" placeholder="Válassz országot" :showClear="true" id="country">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{slotProps.value.name}}</div>
            </div>
            <span v-else>
                    {{slotProps.placeholder}}
                </span>
          </template>
          <template #option="slotProps">
            <div>
              <div>{{slotProps.option.name}}</div>
            </div>
          </template>
        </Dropdown>

        <h5>Bajnokság</h5>
        <Dropdown v-model="league" :options="leagues" optionLabel="name" @change="onChangeLeague" :filter="true" placeholder="Válassz ligát" :showClear="true">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{slotProps.value.name}}</div>
            </div>
            <span v-else>
                    {{slotProps.placeholder}}
                </span>
          </template>
          <template #option="slotProps">
            <div>
              <div>{{slotProps.option.name}}</div>
            </div>
          </template>
        </Dropdown>

        <h5>Hazai Csapat</h5>
        <Dropdown v-model="homeTeam" :options="teams" optionLabel="name" :filter="true" placeholder="Válassz Hazai csapatot" :showClear="true">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{slotProps.value.name}}</div>
            </div>
            <span v-else>
                    {{slotProps.placeholder}}
                </span>
          </template>
          <template #option="slotProps">
            <div>
              <div>{{slotProps.option.name}}</div>
            </div>
          </template>
        </Dropdown>

        <h5>Vendég Csapat</h5>
        <Dropdown v-model="awayTeam" :options="teams" optionLabel="name" :filter="true" placeholder="Válassz Vendég csapatot" :showClear="true">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{slotProps.value.name}}</div>
            </div>
            <span v-else>
                    {{slotProps.placeholder}}
                </span>
          </template>
          <template #option="slotProps">
            <div>
              <div>{{slotProps.option.name}}</div>
            </div>
          </template>
        </Dropdown>

        <h5>Időpont</h5>
        <div class="field col-12 md:col-4">
          <Calendar v-model="matchTime" :showTime="true" :showSeconds="false" dateFormat="yy/mm/dd"/>
        </div>

        <br>
        <div>
          <Button label="Esemény létrehozása" @click="createSportEvent"/>
        </div>

      </div>

  </div>
</template>

<script>
import {onMounted, onUpdated, ref} from 'vue';
import SportEventsService from "@/composables/SportEventsService";

export default {
  setup() {
    const sportCategory = ref();
    const sportCategories  = ref();
    const country = ref();
    const countries = ref();
    const league = ref();
    const leagues = ref();
    const homeTeam = ref();
    const awayTeam = ref();
    const teams = ref();
    const matchTime = ref();
    const alreadyCreated = ref(false);
    const sportEventsService = ref(new SportEventsService());

    onMounted(async () => {
      sportCategories.value = await sportEventsService.value.getCategoryNames();
      countries.value = await sportEventsService.value.getCountries();
      leagues.value = await sportEventsService.value.getLeagues();
      teams.value = await sportEventsService.value.getTeams();
    });

    const createSportEvent = () => {
      try {
        sportEventsService.value.createSportEvent(
            sportCategory.value.name,
            country.value.name,
            league.value.name,
            homeTeam.value.name,
            awayTeam.value.name,
            matchTime.value
        );
      } catch (err) {
        //TODO: throw error and display it if event was already created
        console.log('here: ' + err)
      }

    };

    async function onChangeCategory() {
      if (sportCategory.value) {
        countries.value = await sportEventsService.value.getCountriesByCategory(sportCategory.value.name);
      } else {
        sportCategories.value = await sportEventsService.value.getCategoryNames();
      }
    }

    async function onChangeCountry() {
      if (country.value) {
        leagues.value = await sportEventsService.value.getLeaguesByCategoryAndCountry(sportCategory.value.name, country.value.name);
      } else {
        countries.value = await sportEventsService.value.getCountries();
      }
    }

    async function onChangeLeague() {
      if (league.value) {
        teams.value = await sportEventsService.value.getTeamsByCategoryAndCountryAndLeague(sportCategory.value.name, country.value.name, league.value.name);
      } else {
        leagues.value = await sportEventsService.value.getLeagues();
        teams.value = await sportEventsService.value.getTeams();
      }
    }

    return {
      sportCategory, sportCategories, country, countries, league, leagues,
      homeTeam, awayTeam, teams, matchTime, createSportEvent, alreadyCreated,
      onChangeCategory, onChangeCountry, onChangeLeague
    }
  }
}
</script>

<style scoped>

</style>