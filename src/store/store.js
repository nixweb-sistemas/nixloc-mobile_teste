import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import generic from '@/store/modulos/generic'
import usuario from '@/store/modulos/usuario'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        generic, usuario
    }
})