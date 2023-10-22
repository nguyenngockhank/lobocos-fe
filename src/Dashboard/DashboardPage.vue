<template>
<div>
    <a-row>
        <a-col :span="12">
            <a-statistic title="Số lượng khách hàng" :value="112893" style="margin-right: 50px" />
        </a-col>
        <a-col :span="12">
            <a-statistic title="Tổng số đơn" :value="112893" />
        </a-col>
        <a-col :span="12">
            <a-statistic-countdown title="Day Level" :value="deadline" format="D Ngày H giờ m phút s giây" />
            <a-statistic-countdown
                title="Million Seconds countdown"
                :value="deadline"
                format="HH:mm:ss:SSS"
                style="margin-right: 50px"
            >
                <template #prefix>
                <span>There's only</span>
                </template>
                <template #suffix>
                <span>left for the end.</span>
                </template>
            </a-statistic-countdown>
        </a-col>
    </a-row>
    <div>
        <img style="max-width: 100%;" alt="TO BE CONTINUE" src="https://www.dafont.com/forum/attach/orig/9/6/960974.png?1" />
    </div>
</div>
</template>

<script lang="ts" setup>
const deadline = Date.now() + 1000 * 60 * 60 * 20 * 2;
</script>