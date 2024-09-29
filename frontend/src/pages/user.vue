<script setup lang="ts">
import { Skeleton } from "@/shadcn-components/ui/skeleton";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>
<template>
    <div class="m-4 mb-12">
        <div class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 p-2">
            <h1>Mon compte</h1>
        </div>
        <Account :user="userStore.user" v-if="userStore.user" :isUserProfile="true"/>
        <div v-else>
            <div class="flex flex-col space-y-3">
                <Skeleton class="h-[125px] rounded-xl" />
                <div class="space-y-2">
                    <Skeleton class="h-4" />
                    <Skeleton class="h-4" />
                </div>
            </div>
        </div>
    </div>
</template>
