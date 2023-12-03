<script setup>
import { h, ref } from 'vue';
import router from '@/Shared/router'
import get from 'lodash/get'

import {
  HomeOutlined,
  FileSearchOutlined,
  CalendarOutlined,
  WifiOutlined,
  UserOutlined,
  RollbackOutlined,
} from '@ant-design/icons-vue';

const selectedKeys = ref([]);
const openKeys = ref([]);
const items = ref([
  {
    key: 'dashboard',
    icon: () => h(HomeOutlined),
    label: 'Dashboard',
    title: 'Dashboard',
  },
  {
    key: 'orders',
    icon: () => h(FileSearchOutlined),
    label: 'Đơn hàng',
    title: 'Đơn hàng',
    children: [
      {
        key: 'orders-by-month',
        label: 'Theo tháng',
        title: 'Đơn theo tháng',
      },
      {
        key: 'orders-by-range',
        label: 'Theo khoảng thời gian',
        title: 'Đơn theo khoảng thời gian',
      },
      {
        key: 'orders-by-status',
        label: 'Theo tình trạng',
        title: 'Đơn theo tình trạng',
      },
    ]
  },
  {
    key: 'calendar',
    icon: () => h(CalendarOutlined),
    label: 'Lịch làm việc',
    title: 'Lịch làm việc',
  },
  {
    key: 'consumers',
    icon: () => h(UserOutlined),
    label: 'Khách hàng',
    title: 'Khách hàng',
  },
  {
    key: 'old-dashboard',
    icon: () => h(WifiOutlined),
    label: 'Old Dashboard',
    title: 'Old Dashboard',
  },
  {
    key: 'logout',
    icon: () => h(RollbackOutlined),
    label: 'Logout',
    title: 'Logout',
  },
]);

const handleClick = menuInfo => {
  if (menuInfo.key === 'logout') {
    location.href = get(window, 'appData.baseUrl') + 'admin/authentication/logout'
  }
  if (menuInfo.key === 'old-dashboard') {
    location.href = get(window, 'appData.baseUrl') + 'admin/dashboard/index2'
  }
  router.push({ path: `/${menuInfo.key}` })
};
</script>

<template>
  <a-layout-sider 
    breakpoint="md"
    collapsed-width="0"
  >
      <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          :items="items"
          @click="handleClick"
      />
  </a-layout-sider>
  </template>