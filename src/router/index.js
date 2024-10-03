import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'Contatos',
    component: () => import('../views/CriarContato.vue')
  },
  {
    path: '/update/:id',  // Inclui o parâmetro de ID na rota
    name: 'update',
    component: () => import('../views/UpdateContato.vue')
}

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
