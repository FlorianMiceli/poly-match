<script setup lang="ts">
import { info } from "@/helpers/display";
import { ArrowUpRight, Instagram, Pencil, Trash, ImageOff as NoImage } from "lucide-vue-next";
import type { User } from "@/types/global_types";
import { getProfilePicture, updateProfilePicture, deleteProfilePicture } from "@/helpers/userQueriesHelpers";
import { processProfilePicture } from "@/helpers/processing";

const props = defineProps<{
    user: User;
    isUserProfile: boolean;
}>();

const { data: profilePictureUrl } = getProfilePicture(props.user.id);
const profilePictureMutation = updateProfilePicture()
const profilePictureDelete = deleteProfilePicture()

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const openInstagram = () => {
    if (props.user.instagram_username) window.open(`https://www.instagram.com/${props.user.instagram_username}`, "_blank");
    else info("Info", "Aucun compte Instagram renseigné");
};

const handleProfilePictureUpdate = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (!file) return
        const compressedFile = await processProfilePicture(file)
        profilePictureMutation.mutate(file as File) //TODO : change to compressedFile
    }
    input.click()
};

</script>
<template>
    <div class="flex flex-row items-center justify-between mb-4">
        <div class="flex flex-row items-center">
            <!-- Clickable Avatar -->
            <CustomDrawerDialog title="Photo de profil">
                <!-- Avatar -->
                <template #trigger>
                    <Avatar class="mr-4 w-16 h-16 ml-2 my-1">
                        <AvatarImage :src="profilePictureUrl" alt="@radix-vue" />
                        <AvatarFallback>{{ user.first_name[0].toUpperCase() }}{{ user.last_name[0].toUpperCase() }}</AvatarFallback>
                    </Avatar>
                </template>
                <!-- Menu -->
                <template #content>
                    <div class="px-4 flex flex-col items-center">
                        <NoImage v-if="!profilePictureUrl" class="mb-4 w-24 h-24" />
                        <img v-else :src="profilePictureUrl" :alt="user.first_name + ' ' + user.last_name" class="rounded-lg object-cover mb-2" />
                        <template v-if="isUserProfile">
                            <CustomButton 
                                @click="handleProfilePictureUpdate" 
                                variant="default" 
                                :loading="profilePictureMutation.isPending"
                                text="Mettre à jour"
                            >
                                <Pencil class="mr-2 h-4 w-4"/>
                            </CustomButton>
                            <CustomButton 
                                text="Supprimer la photo" 
                                :loading="profilePictureDelete.isPending" 
                                variant="destructive" 
                                @click="profilePictureDelete.mutate()" 
                            >
                                <Trash class="mr-2 h-4 w-4"/>
                            </CustomButton>
                        </template>
                        <template v-else>
                            <Button @click="openInstagram" variant="outline" class="mb-4">
                                <Instagram />
                                <ArrowUpRight class="ml-2" />
                            </Button>
                        </template>
                    </div>
                </template>
            </CustomDrawerDialog>

            <!-- Name & School -->
            <div class="text-xl font-medium">
                {{ capitalizeFirstLetter(user.first_name) }} {{ capitalizeFirstLetter(user.last_name) }}
                <div class="text-sm text-gray-500">{{ user.school_year }}{{ user.school_major ? ` - ${user.school_major}` : "" }}</div>
            </div>
        </div>
        <Button @click="openInstagram" variant="secondary" class="mr-4">
            <Instagram />
            <ArrowUpRight class="ml-2" />
        </Button>
    </div>
</template>
