import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/js/bootstrap.js"
import Datepicker from 'vuejs-datepicker'
import SmartTable from 'vuejs-smart-table'
import '@fortawesome/fontawesome-free/js/all.js';


// Vue.use(bootstrap)
Vue.use(Datepicker)
Vue.use(SmartTable)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
