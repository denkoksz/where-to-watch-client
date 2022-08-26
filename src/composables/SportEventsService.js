export default class SportEventsService {

    async getSportEvents (days = null) {
        try {
            let url = 'http://localhost:5000/api/sportevents/';
            if (days !== null) {
                url += 'incoming?days=' + days;
            }

            let data = await fetch(url);
            return await data.json();
        } catch (err) {
            console.error(err);
        }
    }
}