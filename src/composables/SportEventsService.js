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