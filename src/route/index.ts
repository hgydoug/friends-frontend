import { createMemoryHistory, createRouter } from 'vue-router'

import IndexView from '../pages/IndexView.vue'
import  TeamView from '../pages/TeamView.vue'
import  UserView from '../pages/UserView.vue'
import  SearchView from '../pages/SearchView.vue'
import UserLoginView from '../pages/UserLoginView.vue'
import UserUpdateView from '../pages/UserUpdateView.vue'
import UserEditView from '../pages/UserEditView.vue'
import SearchResultView from '../pages/SearchResultView.vue'
import TeamAddView from '../pages/TeamAddView.vue'
import TeamUpdateView from '../pages/TeamUpdateView.vue'
import UserTeamJoinView from '../pages/UserTeamJoinView.vue'
import UserTeamCreateView from '../pages/UserTeamCreateView.vue'

const routes = [
    { path: '/', component: IndexView },
    { path: '/user', title: '个人信息', component: UserView },
    { path: '/search',  title: '找伙伴', component: SearchView },
    { path: '/team', title: '找队伍', component: TeamView },

    { path: '/team/add', title: '创建队伍', component: TeamAddView },
    { path: '/team/update', title: '更新队伍', component: TeamUpdateView },
   
    { path: '/user/list', title: '用户列表', component: SearchResultView },
    { path: '/user/edit', title: '编辑信息', component:  UserEditView},
    { path: '/user/login', title: '登录', component: UserLoginView },
    { path: '/user/update', title: '更新信息', component: UserUpdateView },
    { path: '/user/team/join', title: '加入队伍', component: UserTeamJoinView },
    { path: '/user/team/create', title: '创建队伍', component: UserTeamCreateView },


]

const router =createRouter({
    history: createMemoryHistory(),
    routes,
})

export {
    router,
    routes
} 
