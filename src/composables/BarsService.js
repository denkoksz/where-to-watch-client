export default class BarsService {

    async getBars () {
        try {
            const url = 'http://localhost:5000/api/bars/';
            let data = await fetch(url);
            return await data.json();
        } catch (err) {
            console.error(err);
        }
    }
}