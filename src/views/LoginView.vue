<template>
    <div id="LoginView" class="grid h-screen place-items-center">
        <div>
            {{ userStore }}
            <img width="280" src="img/GmailLogin.png" />
            <div class="flex justify-center mt-5">
                <GoogleLogin :callback="callback" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/store/user-store'
const userStore = useUserStore();
const callback = async (response) => {
    await userStore.getUserDetailsFromGoogle(response);
};
</script>

<style lang="scss" scoped></style>
