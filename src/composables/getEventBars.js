import { ref } from "vue";

const getEventBars = () => {
    const eventBars = ref([]);
    const error = ref(null);

    const load = async () => {
        try {
            let url = 'http://localhost:5000/api/bars/';

            let data = await fetch(url);
            eventBars.value = await data.json();
        } catch (err) {
            error.value = err.message;
            console.error(error.value);
        }
    }
    return { eventBars, error, load };
}

export default getEventBars;