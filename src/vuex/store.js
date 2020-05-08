import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        userName : null,//当前用户
        isLogin: false,
        token:''

    },
    getters,
    mutations,
    actions
})
