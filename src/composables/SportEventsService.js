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
}