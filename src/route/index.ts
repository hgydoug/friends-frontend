import { createMemoryHistory, createRouter } from 'vue-router'

import IndexView from '../pages/IndexView.vue'
import  TeamView from '../pages/TeamView.vue'
import  UserView from '../pages/UserView.vue'
import  SearchView from '../pages/SearchView.vue'
import UserLoginView from '../pages/UserLoginView.vue'
import UserUpdateView from '../pages/UserUpdateView.vue'
import UserEditView from '../pages/UserEditView.vue'

const routes = [
    { path: '/', component: IndexView },
    { path: '/user', title: '个人信息', component: UserView },
    { path: '/search',  title: '找伙伴', component: SearchView },
    { path: '/team', title: '找队伍', component: TeamView },

    // { path: '/team/add', title: '创建队伍', component: TeamAddPage },
    // { path: '/team/update', title: '更新队伍', component: TeamUpdatePage },
   
    // { path: '/user/list', title: '用户列表', component: SearchResultPage },
    { path: '/user/edit', title: '编辑信息', component:  UserEditView},
    { path: '/user/login', title: '登录', component: UserLoginView },
    { path: '/user/update', title: '更新信息', component: UserUpdateView },
    // { path: '/user/team/join', title: '加入队伍', component: UserTeamJoinPage },
    // { path: '/user/team/create', title: '创建队伍', component: UserTeamCreatePage },


]

const router =createRouter({
    history: createMemoryHistory(),
    routes,
})

export {
    router,
    routes
} 
