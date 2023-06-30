<template>
  <div
    id="SingleMessageSection"
    class="w-full bg-white ml-2 rounded-t-xl shadow-sm h-full"
  >
    <div class="">
      <div class="flex items-center px-4 py-2">
        <div class="flex items-center justify-between px-1.5 py-0.5">
          <div class="flex">
            <router-link to="/email">
              <IconComponent
                iconString="back"
                iconColor="#636363"
                :iconSize="19"
                hoverColor="hover:bg-gray-200"
                text="Back to inbox"
              />
            </router-link>
            <IconComponent
              @click="deleteEmail(email.id)"
              class="ml-3"
              iconString="trash"
              iconColor="#636363"
              :iconSize="19"
              hoverColor="hover:bg-gray-200"
              text="Delete"
            />
          </div>
          <div class="text-xs text-gray-500">1-50 of 153</div>
        </div>
      </div>
      <div class="w-full text-xl ml-20 font-light pt-5">
        {{ email.subject }}
      </div>
      <div class="w-full flex">
        <img
          class="rounded-full mt-8 mx-5 custom-img"
          src="https://via.placeholder.com/45"
        />
        <div class="w-full my-4 mx-0.5">
          <div class="font-semibold text-sm mt-4 mb-4">
            <div class="w-full flex justify-between items-center">
              <div>{{ email.fromEmail }}</div>
              <div class="mr-5 text-xs font-normal">{{ email.createdAt }}</div>
            </div>
            <span class="text-xs text-gray-500 font-normal">{{
              email.toEmail
            }}</span>
          </div>
          <div>
            {{ email.body }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconComponent from "@/components/IconComponent.vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/user-store";
import { onMounted, ref } from "vue";
import moment from "moment/moment";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
let email = ref({});
onMounted(async () => {
  const res = await userStore.getEmailById(route.params.id);
  await userStore.emailHasBeenViewed(res.id);
  email.value = {
    id: res.id,
    body: res.body,
    createdAt: moment(res.createdAt).format("MMM D HH:mm"),
    firstName: res.firstName,
    lastName: res.lastName,
    subject: res.subject,
    hasViewed: res.hasViewed,
    toEmail: res.toEmail,
  };
});
const deleteEmail = async (id) => {
  let res = confirm("Are you sure you want to delete this?");
  if (res) {
    await userStore.deleteEmail(id);
    setTimeout(() => {
      router.push("/email");
    }, 257);
  }
};
</script>

<style lang="scss">
#SingleMessageSection {
  .custom-img {
    width: 40px;
    height: 40px;
  }
}
</style>
