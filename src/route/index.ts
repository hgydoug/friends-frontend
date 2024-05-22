import { createMemoryHistory, createRouter } from 'vue-router'

import IndexView from '../components/IndexView.vue'
import  TeamView from '../components/TeamView.vue'
import  UserView from '../components/UserView.vue'
import  SearchView from '../components/SearchView.vue'

const routes = [
    { path: '/', component: IndexView },
    { path: '/team', component: TeamView },
    { path: '/user', component: UserView },
    { path: '/search', component: SearchView },

]

const router =createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router
