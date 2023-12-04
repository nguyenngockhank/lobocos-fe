import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardPage from '@/Dashboard/DashboardPage.vue'
import OrdersPageByMonth from '@/Orders/ByMonth/OrdersPageByMonth.vue'
import OrdersPageByRange from '@/Orders/ByRange/OrdersPageByRange.vue'
import OrdersPageByStatus from '@/Orders/ByStatus/OrdersPageByStatus.vue'
import OrdersPageByConsumer from '@/Orders/ByConsumer/OrdersPageByConsumer.vue'
import OrderDetailPage from '@/OrderDetail/OrderDetailPage.vue'
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
      alias: '/orders',
      path: '/orders-by-month',
      name: 'orders-by-month-filter',
      component: OrdersPageByMonth
    },
    {
      path: '/orders-by-month/:month',
      name: 'orders-by-month',
      component: OrdersPageByMonth
    },
    {
      path: '/orders-by-range',
      name: 'orders-by-range',
      component: OrdersPageByRange
    },
    {
      path: '/orders-by-status',
      name: 'orders-by-status-filter',
      component: OrdersPageByStatus
    },
    {
      path: '/orders-by-status/:orderStatus',
      name: 'orders-by-status',
      component: OrdersPageByStatus
    },
    {
      path: '/orders-by-consumer',
      name: 'orders-by-consumer-filter',
      component: OrdersPageByConsumer
    },
    {
      path: '/orders-by-consumer/:consumerId',
      name: 'orders-by-consumer',
      component: OrdersPageByConsumer
    },
    {
      path: '/orders/:id',
      name: 'orderdetail',
      component: OrderDetailPage,
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
    case "/orders-by-range":
      store.activeOrders('Đơn trong khoảng thời gian')
      break;
    case "/calendar":
      store.activeCalendar()
      break;
    case "/consumers":
      store.activeConsumers()
      break;
  }

  switch(to.name) {
    case "orderdetail":
      store.activeOrder(to.params?.id?.toString() || '0');
      break;
    case "orders-by-month":
    case "orders-by-month-filter":
      store.activeOrders('Đơn trong tháng')
      break;
    case "orders-by-status":
    case "orders-by-status-filter":
      store.activeOrders('Đơn theo tình trạng')
      break;
    case "orders-by-consumer":
    case "orders-by-consumer-filter":
      store.activeOrders('Đơn của khách')
      break;
  }

  next();
})

export default router
