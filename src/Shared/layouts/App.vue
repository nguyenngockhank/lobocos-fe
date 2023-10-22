<script setup lang="ts">
import AppFooter from './AppFooter.vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
</script>

<template>
<a-layout>
  
  <AppSidebar />
  <a-layout>
    <AppHeader />
    <a-layout-content :style="{ margin: '24px 16px 0' }">
      <div :style="{ padding: '24px', background: '#fff',  }">
        <RouterView />
      </div>
    </a-layout-content>
    
    <AppFooter />
  </a-layout>
</a-layout>
</template>

<style scoped>
/* #components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
} */

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

/* [data-theme='dark'] .site-layout-sub-header-background {
  background: #141414;
} */
</style>