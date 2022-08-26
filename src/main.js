import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { BootstrapVue3 } from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Paginator from "primevue/paginator";
import Button from "primevue/button";


library.add(fas);

createApp(App)
    .use(router)
    .use(BootstrapVue3)
    .use(PrimeVue)
    .component("font-awesome-icon", FontAwesomeIcon)
    .component("DataTable", DataTable)
    .component("Column", Column)
    .component("InputText", InputText)
    .component("Paginator", Paginator)
    .component("Button", Button)
    .mount("#app");
