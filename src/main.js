import { createApp } from 'vue'

import App from './App.vue'
import router from './router.js'
import store from './store/index.js';

import BaseCard from './components/ui/BaseCard.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseButton from './components/ui/BaseButton.vue';


import Header from './components/layout/Header.vue';

import './index.css'

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-dialog', BaseDialog);
app.component('base-spinner', BaseSpinner);
app.component('my-header', Header);
app.component('base-button', BaseButton);

app.mount('#app');