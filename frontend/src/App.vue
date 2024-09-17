<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
    <div class="app-container">
        <header class="header">
            <div class="app-name">PolyMatch✨</div>
        </header>
        <main class="main-content">
            <router-view />
        </main>
        <footer class="footer">
            <el-text>Made with ❤️ by Florian M.</el-text>
        </footer>
        <VueQueryDevtools />
        <Toaster />
    </div>
</template>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

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

.main-content {
    flex: 1;
}

.footer {
    height: 3rem;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* ... other existing styles ... */
</style>
