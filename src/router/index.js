import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../services/auth'
import { useNoteStore } from '../services/notas'
import { useUserStore } from '../services/users'
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import DashboardLayout from "../components/layout/DashboardLayout.vue";
import App from "../views/App.vue";
import NotesView from "../views/notes/NotesView.vue";
import NotesCreate from "../views/notes/NotesCreate.vue";
import NotesShow from "../views/notes/NotesShow.vue";
import NotesEdit from "../views/notes/NotesEdit.vue";
import UsersView from "../views/users/UsersView.vue";
import UsersCreate from "../views/users/UsersCreate.vue";
import UsersEdit from "../views/users/UsersEdit.vue";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { requiresGuest: true }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: { requiresGuest: true }
    },
    {
        path: '/',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: App
            },
            {
                path: 'notes',
                name: 'notes',
                component: NotesView,
                beforeEnter: async (to, from, next) => {
                    const noteStore = useNoteStore()
                    await noteStore.getNotes()
                    next()
                }
            },
            {
                path: 'notes/new',
                name: 'notes.create',
                component: NotesCreate,
                meta: { requiresAuth: true }
            },
            {
                path: 'notes/:id',
                name: 'notes.show',
                component: NotesShow,
                meta: { requiresAuth: true },
                beforeEnter: async (to, from, next) => {
                    const noteStore = useNoteStore()
                    await noteStore.getNote(to.params.id)
                    next()
                }
            },
            {
                path: 'notes/:id/edit',
                name: 'notes.edit',
                component: NotesEdit,
                meta: { requiresAuth: true },
                beforeEnter: async (to, from, next) => {
                    const noteStore = useNoteStore()
                    await noteStore.getNote(to.params.id)
                    next()
                }
            },
            {
                path: 'users',
                name: 'users',
                component: UsersView,
                meta: { requiresAdmin: true },
                beforeEnter: async (to, from, next) => {
                    const userStore = useUserStore()
                    await userStore.getUsers()
                    next()
                }
            },
            {
                path: 'users/new',
                name: 'users.create',
                component: UsersCreate,
                meta: { requiresAuth: true }
            },
            {
                path: 'users/:id/edit',
                name: 'users.edit',
                component: UsersEdit,
                meta: { requiresAuth: true },
                beforeEnter: async (to, from, next) => {
                    const userStore = useUserStore()
                    await userStore.getUser(to.params.id)
                    next()
                }
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresGuest && authStore.isAuthenticated) {
        return next('/dashboard')
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next('/login')
    }

    if (to.meta.requiresAdmin && !authStore.isAdmin) {
        return next('/dashboard')
    }

    next()
})

export default router