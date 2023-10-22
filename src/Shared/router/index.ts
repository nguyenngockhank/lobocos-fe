import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardPage from '@/Dashboard/DashboardPage.vue'
import OrdersPage from '@/Orders/OrdersPage.vue'
import CalendarPage from '@/Calendar/CalendarPage.vue'
import ConsumersPage from '@/Consumers/ConsumersPage.vue'
import { usePageHeaderStore } from '@/Shared/PageHeaderStore'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      alias: '/dashboard',
      name: 'dashboard',
      component: DashboardPage
    },
    {
      path: '/orders',
      name: 'login',
      component: OrdersPage
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarPage
    },
    {
      path: '/consumers',
      name: 'consumers',
      component: ConsumersPage
    },
  ]
})

router.beforeEach((to, from, next) => {
  const store = usePageHeaderStore()
  switch(to.path) {
    case "/":
    case "/dashboard":
      store.activeDashboard()
      break;
    case "/orders":
      store.activeOrders()
      break;
    case "/calendar":
      store.activeCalendar()
      break;
    case "/consumers":
      store.activeConsumers()
      break;
  }
  next();
})

export default router
