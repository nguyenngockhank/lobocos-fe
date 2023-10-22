<template>
<div style="margin-bottom: 10px;">
<a-tag v-for="(stateInfo, key) in orderStateInfoMap" 
  :color="stateInfo.color" 
  :key="key"
>
  {{ stateInfo.label }}
</a-tag>
</div>

<FullCalendar :options="calendarOptions">
  <template v-slot:eventContent='arg'>
    <span class="event-title" :title="arg.event.title">
      <a-tag :color="orderStateInfoMap[arg.event.extendedProps.type].color">
        {{ arg.event.title }}
      </a-tag>
    </span>
  </template>
</FullCalendar>
</template>

<script lang="ts" setup>
import dayGridPlugin from '@fullcalendar/daygrid'
import { getOrdersByDateRange } from './calendarApi'

const calendarOptions = {
  editable: false,
  views: {
    dayGridMonth: {
      buttonText: "Calendar",
    },
    matchesOnYear: {
      type: 'listYear',
      buttonText: 'Year'
    },
    matchesOnMonth: {
      type: 'listMonth',
      buttonText: 'Month'
    },
  },
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth',
      // right: 'dayGridMonth,matchesOnYear,matchesOnMonth'
  },
  plugins: [ dayGridPlugin ],
  initialView: 'dayGridMonth',
  // weekends: true,
  events:  async (info: { start: Date, end: Date }, successCb: any) => {
    const response = await getOrdersByDateRange(info.start, info.end)
    console.log(response)
    successCb(response)
  } 
}

const orderStateInfoMap: Record<string, { color: string; label: string }> = {
  deposited: {
    color: 'gold',
    label: 'Cọc tiền',
  },
  pattern: {
    color: 'magenta',
    label: 'Xong bản dập',
  },
  deadline: {
    color: 'default',
    label: 'Deadline',
  },
  completed: {
    color: 'success',
    label: 'Đã xong',
  }
}
</script>

<style>
.event-title{
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>