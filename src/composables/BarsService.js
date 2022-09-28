export default class BarsService {

    URL = 'http://localhost:5000/api/bars/';

    async getBars(sportEventId) {
        try {
            let url = this.URL;
            if (sportEventId !== undefined) {
                url = 'http://localhost:5000/api/sportevents/' + sportEventId + '/bars';
            }
            let data = await fetch(url);
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

    formatMultipleBars(bars) {
        return bars.map((bar) => {
            return this.formatBar(bar);
        });
    }

    formatBar(bar) {
        const formattedBar = bar;
        formattedBar.address = bar.zipCode + ', ' + bar.city + ', ' + bar.street + ' ' + bar.houseNumber;
        formattedBar.payments = this.getPayments(bar.creditCard, bar.szepCard);
        formattedBar.link = this.getLinkForBar(bar);
        return formattedBar;
    }

    getPayments = (creditCard, szepCard) => {
        let paymentOptions = 'készpénz';
        if (creditCard === 1) {
            paymentOptions += ', bankkártya';
        }
        if (szepCard === 1) {
            paymentOptions += ', SZÉP kártya';
        }
        return paymentOptions;
    }

    getLinkForBar = (bar) => {
        return "https://www.google.com";
    };
}