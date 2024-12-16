<script setup lang='ts'>
import { DrawerTrigger } from "vaul-vue";

defineProps<{
    title: string;
    description?: string;
}>()
</script>
<template>
    <Drawer>
        <DrawerTrigger as-child>
            <slot name="trigger"/>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>
                    <span class="font-bold text-xl">{{ title }}</span>
                    <span class="text-gray-400 text-lg block">{{ description ? description : "" }}</span>
                </DrawerTitle>
            </DrawerHeader>

            <slot name="content"/>
        </DrawerContent>
    </Drawer>
</template>