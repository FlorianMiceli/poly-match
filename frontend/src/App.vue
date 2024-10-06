<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { getAccessToken } from './helpers/spotifyQueriesHelpers';
import { useRouter } from 'vue-router';
const router = useRouter()
getAccessToken()
</script>

<template>
    <Toaster />
    <div vaul-drawer-wrapper class="app-container">
        <header class="header flex flex-row justify-between">
            <div class="app-name">🚧🚧🚧</div>
            <Button v-if="router.currentRoute.value.path === '/home'" @click="router.push('/user')" variant="outline"> Mon compte</Button>
            <Button v-if="router.currentRoute.value.path === '/user'" @click="router.push('/home')" variant="outline"> Matchs</Button>
        </header>
        <main class="main-content">
            <router-view />
        </main>
        <footer class="footer">
            <!-- <el-text>Made with ❤️ by Florian</el-text> -->
        </footer>
        <VueQueryDevtools />
    </div>
</template>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #ffffff;
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
