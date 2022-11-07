import logger from "@fortawesome/vue-fontawesome/src/logger";

export default class SportEventsService {

    async getSportEvents (props = null) {
        const days = props.days;
        const barId = props.barId;
        try {
            let url = 'http://localhost:5000/api/sportevents/';
            if (days !== undefined) {
                url += 'incoming?days=' + days;
            }
            if (barId !== undefined) {
                url += 'bars/' + barId + '/events';
            }
            let data = await fetch(url);
            return await data.json();
        } catch (err) {
            console.error(err);
        }
    }

    async getSportEventById(sportEventId) {
        try {
            let url = 'http://localhost:5000/api/sportevents/' + sportEventId;
            let data = await fetch(url);
            return await data.json();
        } catch (err) {
            console.error(err);
        }
    }

    async getCategoryNames() {
        try {
            let url = 'http://localhost:5000/api/sportmaincategory/';
            let data = await (await fetch(url)).json();
            let names = [];
            data.map(rows => {
                names.push({name: rows.categoryName});
            });
            return names;
        } catch (err) {
            console.error(err);
        }
    }

    async getCountries() {
        try {
            let url = 'http://localhost:5000/api/country/';
            let data = await (await fetch(url)).json();
            let countries = [];
            data.map(rows => {
                countries.push({name: rows.countryName});
            });
            return countries;
        } catch (err) {
            console.error(err);
        }
    }

    async getLeagues() {
        try {
            let url = 'http://localhost:5000/api/leagues/';
            let data = await (await fetch(url)).json();
            let leagues = [];
            data.map(rows => {
                leagues.push({name: rows.leagueName});
            });
            return leagues;
        } catch (err) {
            console.error(err);
        }
    }

    async getTeams() {
        try {
            let url = 'http://localhost:5000/api/team/';
            let data = await (await fetch(url)).json();
            let teams = [];
            data.map(rows => {
                teams.push({name: rows.teamName});
            });
            return teams;
        } catch (err) {
            console.error(err);
        }
    }

    async getCountriesByCategory(category) {
        try {
            let url = 'http://localhost:5000/api/country/filter?category=' + category;
            let data = await (await fetch(url)).json();
            let countries = [];
            data.map(rows => {
                countries.push({name: rows.countryName});
            });
            return countries;
        } catch (err) {
            console.error(err);
        }
    }

    async getLeaguesByCategoryAndCountry(category, country) {
        try {
            let url = 'http://localhost:5000/api/leagues/filter?category=' + category + '&country=' + country;
            let data = await (await fetch(url)).json();
            let leagues = [];
            data.map(rows => {
                leagues.push({name: rows.leagueName});
            });
            return leagues;
        } catch (err) {
            console.error(err);
        }
    }

    async getTeamsByCategoryAndCountryAndLeague(category, country, league) {
        try {
            let url = 'http://localhost:5000/api/team/filter?category=' + category + '&country=' + country + '&league=' + league;
            let data = await (await fetch(url)).json();
            let teams = [];
            data.map(rows => {
                teams.push({name: rows.teamName});
            });
            return teams;
        } catch (err) {
            console.error(err);
        }
    }

    createSportEvent(sportCategory, country, league, homeTeam, awayTeam, matchTime) {
        let sportEvent = {
            teamType: 'whatever',
            mainCategory: sportCategory,
            country: country,
            leagueName: league,
            homeTeamName: homeTeam,
            awayTeamName: awayTeam,
            eventDate: matchTime
        }

        let error;

        fetch('http://localhost:5000/api/sportevents', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sportEvent)
        }).then(async (response) => {
            if (response.ok) {
                console.log('ok');
                return;
            }
            error = await response.json();
            throw new Error(error.message);
        }).catch(() => {
            throw new Error(error.message);
        });
    }

    formatSingleSportEvent = (sportEvent) => {
        return this.extendSportEvent(sportEvent);
    };

    formatMultipleSportEvent = (sportEvents) => {
        return sportEvents.map((sportEvent) => {
            return this.extendSportEvent(sportEvent);
        });
    };

    extendSportEvent(sportEvent) {
        const event = sportEvent;
        event.mainCategory = this.capitalizeFirstLetter(sportEvent.mainCategory);
        event.matchName = sportEvent.homeTeamName + ' - ' + sportEvent.awayTeamName;
        event.eventDate = sportEvent.eventDate.replace('T', ' ');
        event.link = this.getLinkForSportEvent(event.pkEvent);
        return event;
    }

    getLinkForSportEvent = (id) => {
        return "/sportevents/" + id;
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}