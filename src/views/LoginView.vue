<template>
    <div id="LoginView" class="grid h-screen place-items-center">
<div>
    <img width="280" src="img/GmailLogin.png" >
    <div class="flex justify-center">
        <GoogleLogin :callback="callback"/>
    </div>
</div>
    </div>
</template>

<script setup>
const callback=(response)=>{
    console.log(response);
}
</script>

<style lang="scss" scoped>

</style>