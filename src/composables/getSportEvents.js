import { ref } from "vue";

const getSportEvents = (days = null) => {
    const sportEvents = ref([]);
    const error = ref(null);

    const load = async () => {
        try {
            let url = 'http://localhost:5000/api/sportevents/';
            if (days !== null) {
                url += 'incoming?days=' + days;
            }

            let data = await fetch(url);
            sportEvents.value = await data.json();
        } catch (err) {
            error.value = err.message;
            console.error(error.value);
        }
    }
    return { sportEvents, error, load };
}

export default getSportEvents;