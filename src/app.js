import Vue from 'nativescript-vue'
import store from './store/store'

import Login from './views/modulos/adm/Login'


//Vue.prototype.$axios = axios;
//Vue.prototype.$axios.defaults.baseURL = 'https://rickandmortyapi.com/api/';


new Vue({
  render: (h) => h('frame', [h(Login)]),
  store: store
}).$start()
