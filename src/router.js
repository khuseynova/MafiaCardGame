import { createRouter, createWebHistory } from "vue-router";

import LandingPage from './pages/LandingPage.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import AboutPage from './pages/AboutPage.vue';
import RoomList from './pages/RoomList.vue';
import NotFound from './pages/NotFound.vue';
import GamePage from './pages/game/GamePage.vue';
import RoomForm from './components/rooms/RoomForm.vue';

import store from "./store/index";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        //type stands for login of register
        { path: '/', redirect: '/home' },
        {
            path: '/home',
            name: 'home',
            component: LandingPage
        },
        {
            path: '/about',
            name: 'about',
            component: AboutPage
        },
        {
            path: '/auth/:type',
            name: 'auth',
            component: UserAuth,
            meta: {isGuest: true},
            props: true,
        },
        {
            path: '/rooms',
            name: 'rooms',
            component: RoomList
            //game page as child component ???
        },
        {
            path: '/room/:id',
            name: 'room',
            component: GamePage,
            //Name or room id will be used as props 
            // props: true,
        },
        { path: '/room', component: RoomForm },
        { path: '/:notFound(.*)', component: NotFound },
    ]
});

router.beforeEach((to, from, next) => {
    if (store.state.auth.user.token && to.meta.isGuest) {
        next({ name: 'home' });
    } else {
        next();
    }
})

export default router;