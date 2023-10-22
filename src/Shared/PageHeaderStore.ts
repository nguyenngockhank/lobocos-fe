import { defineStore } from 'pinia'
import { ref } from 'vue';

export type BreadcrumbItem = {
    path: string;
    breadcrumbName: string;
}

export type PageHeaderInfo = {
    title: string;
    subtitle?: string;
    routes: BreadcrumbItem[];
}

export const dashboardBreadItem = {
    path: '',
    breadcrumbName: 'Admin',
};

export const ordersBreadItem = {
    path: 'orders',
    breadcrumbName: 'DS Đơn hàng',
}

export const calendarBreadItem =  {
    path: 'calendar',
    breadcrumbName: 'Lịch làm việc',
}

export const consumersBreadItem =  {
    path: 'consumers',
    breadcrumbName: 'DS Khách hàng',
}

const dashboardPageInfo = {
    title: 'Dashboard nè',
    routes: [dashboardBreadItem]
}

const ordersPageInfo = {
    title: 'Đơn hàng nè',
    routes: [dashboardBreadItem, ordersBreadItem]
}
const calendarPageInfo = {
    title: 'Lịch làm việc',
    routes: [dashboardBreadItem, calendarBreadItem]
}
const consumersPageInfo = {
    title: 'Khách hàng',
    routes: [dashboardBreadItem, consumersBreadItem]
}

export const usePageHeaderStore = defineStore('breadcrumb', () => {
    const routes = ref<BreadcrumbItem[]>([])
    const title = ref('Page Title')
    const subtitle = ref('Subtitle')

    function setPageInfo(pageInfo: PageHeaderInfo) {
        routes.value = pageInfo.routes;
        title.value = pageInfo.title;
        subtitle.value = pageInfo.subtitle || '';
    }

    const activeDashboard = () => setPageInfo(dashboardPageInfo)
    const activeOrders = () => setPageInfo(ordersPageInfo)
    const activeCalendar = () => setPageInfo(calendarPageInfo)
    const activeConsumers = () => setPageInfo(consumersPageInfo)
    
    return { routes, title, subtitle, activeDashboard, activeOrders, activeCalendar, activeConsumers, setPageInfo }
})