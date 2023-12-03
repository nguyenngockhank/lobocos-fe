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

<script setup>
import { h, ref } from 'vue';
import router from '@/Shared/router'

import {
  HomeOutlined,
  FileSearchOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  UserOutlined,
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
  // {
  //   key: 'apps',
  //   icon: () => h(AppstoreOutlined),
  //   label: 'Tiện ích',
  //   title: 'Navigation Three',
  //   children: [
  //     {
  //       key: '3',
  //       label: 'Option 3',
  //       title: 'Option 3',
  //     },
  //     {
  //       key: '4',
  //       label: 'Option 4',
  //       title: 'Option 4',
  //     },
  //     {
  //       key: 'sub1-2',
  //       label: 'Submenu',
  //       title: 'Submenu',
  //       children: [
  //         {
  //           key: '5',
  //           label: 'Option 5',
  //           title: 'Option 5',
  //         },
  //         {
  //           key: '6',
  //           label: 'Option 6',
  //           title: 'Option 6',
  //         },
  //       ],
  //     },
  //   ],
  // },
]);
const handleClick = menuInfo => {
  // console.log('click ', menuInfo);
  router.push({ path: `/${menuInfo.key}` })
};
</script>
