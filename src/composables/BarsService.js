export default class BarsService {

    URL = 'http://localhost:5000/api/bars/';

    async getBars() {
        try {
            let data = await fetch(this.URL);
            return await data.json();
        } catch (err) {
            console.error(err);
        }
    }

    async getBarById(id) {
        try {
            let singleBarUrl = this.URL + id;
            let data = await fetch(singleBarUrl);
            return await data.json();
        } catch (err) {
            console.error(err);
        }
    }
}