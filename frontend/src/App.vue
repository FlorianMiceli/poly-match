<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
    <header class="header">
        <div class="app-name">PolyMatch✨</div>
    </header>
    <router-view />
    <VueQueryDevtools />
    <Toaster />
    <el-text class="flex justify-center">Made with ❤️ by Florian M.</el-text>
</template>

<style scoped>

.header {
    height: 6vh;
    background-color: white;
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem; /* Increase font size */
}

.app-name {
    font-weight: bold;
}
</style>
