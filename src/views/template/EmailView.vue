<template>
  <div id="EmailView" class="bg-gray-50 h-screen">
    <div class="flex items-center p-2">
      <div class="logo-section flex justify-start items-center px-3.5">
        <IconComponent
          class="-ml-2 mr-2"
          iconString="menu"
          iconColor="#636363"
          :iconSize="19"
          hoverColor="hover:bg-gray-200"
          text="Main menu"
        />
        <img src="../../../public/img/GmailLogo.png" width="110" />
      </div>
      <div class="flex w-full justify-between">
        <div
          class="input-width w-full bg-gray-200 flex items-center p-1 px-2 rounded-lg"
        >
          <IconComponent
            iconString="magnify"
            iconColor="#636363"
            :iconSize="19"
            hoverColor="hover:bg-gray-200"
            text="Search"
          /><input
            @input="searchEmails"
            v-model="query"
            placeholder="Search mail"
            type="text"
            class="w-full h-10 bg-gray-200 border-transparent border-none focus:ring-0 outline-none placeholder-gray-900"
          />
          <IconComponent
            v-show="query.length == 0"
            iconString="tune"
            iconColor="#636363"
            :iconSize="19"
            hoverColor="hover:bg-gray-200"
            text="Show search options"
          />
          <IconComponent
            v-show="query.length > 0"
            @click="emptyQuery"
            iconString="close"
            iconColor="#636363"
            :iconSize="19"
            hoverColor="hover:bg-gray-200"
            text="Clear field"
          />
        </div>
        <div class="flex w-32 justify-between items-center ml-6">
          <IconComponent
            iconString="cog"
            iconColor="#636363"
            :iconSize="19"
            hoverColor="hover:bg-gray-200"
            text="Settings"
          />
          <IconComponent
            iconString="apps"
            iconColor="#636363"
            :iconSize="19"
            hoverColor="hover:bg-gray-200"
            text="Google apps"
          />
          <UserComponent />
        </div>
      </div>
    </div>
    <div class="flex w-full justify-between">
      <div id="SideMenu" class="side-menu">
        <div
          @click="newMessageOpen = !newMessageOpen"
          class="flex items-center justify-center bg-sky-200 w-36 h-8 mt-2 rounded-2xl ml-2 p-7 cursor-pointer"
        >
          <PencilOutlineIcon :size="25" class="mr-4" />
          <span class="text-sm">Compose</span>
        </div>
        <div class="my-5"></div>
        <router-link to="/email">
          <div
            class="flex justify-between px-6 py-1.5 bg-blue-100 rounded-r-full side-menu-item"
          >
            <div class="flex items-center">
              <InboxIcon :size="17" />
              <div class="text-sm pl-4 font-semibold">Inbox</div>
            </div>
            <div class="text-xs font-semibold" v-if="cnt > 0">
              {{ cnt }}
            </div>
          </div>
        </router-link>
        <div class="flex justify-between px-6 py-1.5">
          <div class="flex items-center">
            <StarOutlineIcon :size="17" />
            <div class="text-sm pl-4">Starred</div>
          </div>
        </div>
        <div class="flex justify-between px-6 py-1.5">
          <div class="flex items-center">
            <ClockOutlineIcon :size="17" />
            <div class="text-sm pl-4">Snoozed</div>
          </div>
        </div>
        <div class="flex justify-between px-6 py-1.5">
          <div class="flex items-center">
            <SendOutlineIcon :size="17" />
            <div class="text-sm pl-4">Sent</div>
          </div>
        </div>
        <div class="flex justify-between px-6 py-1.5">
          <div class="flex items-center">
            <FileOutlineIcon :size="17" />
            <div class="text-sm pl-4">Drafts</div>
          </div>
        </div>
      </div>
      <div class="w-full">
        <router-view />
      </div>
      <div class="m-4">
        <div class="w-6 h-6 flex justify-center mb-7">
          <img class="object-center" src="img/GoogleCalendar.png" />
        </div>
        <div class="w-6 h-6 flex justify-center mb-7">
          <img class="object-center" src="img/GoogleKeep.png" />
        </div>
        <div class="w-6 h-6 flex justify-center mb-7">
          <img class="object-center" src="img/GoogleTasks.png" />
        </div>
        <div class="w-6 h-6 flex justify-center mb-7">
          <img class="object-center" src="img/GoogleContacts.png" />
        </div>
        <div class="w-6 mb-7 border border-gray-300"></div>
        <div class="w-6 h-6 flex justify-center mb-7">
          <PlusIcon />
        </div>
      </div>
    </div>
    <div
      id="NewMessageSection"
      v-if="newMessageOpen"
      class="absolute bottom-0 right-0 mr-20 rounded-t-lg shadow-2xl bg-white"
    >
      <div
        class="flex items-center justify-between rounded-t-lg w-full text-sm px-3.5 py-2.5 bg-gray-200"
      >
        <div>New Message</div>
        <CloseIcon
          @click="newMessageOpen = false"
          class="cursor-pointer"
          :size="19"
        />
      </div>
      <div>
        <div class="relative flex items-center px-3.5 py-2">
          <div class="text-sm text-gray-400">To</div>
          <input
            v-model="toEmail"
            class="w-full h-6 border-transparent border-none focus:ring-0 outline-none"
            type="text"
          />
          <div class="absolute border-b w-[calc(100%-30px)] bottom-0"></div>
        </div>
        <div class="relative flex items-center px-3.5 py-2">
          <div class="text-sm text-gray-400">Subject</div>
          <input
            v-model="subject"
            class="w-full h-6 border-transparent border-none focus:ring-0 outline-none"
            type="text"
          />
          <div class="absolute border-b w-[calc(100%-30px)] bottom-0"></div>
        </div>
      </div>
      <div class="m-3">
        <textarea
          v-model="body"
          class="w-full border-none border-transparent focus:ring-0 outline-none"
          style="resize: none"
          rows="14"
        ></textarea>
      </div>
      <div class="p-4 mt-5">
        <button
          @click="sendEmail"
          class="bg-blue-700 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-full"
        >
          Send message
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/store/user-store";
import IconComponent from "../../components/IconComponent.vue";
import UserComponent from "../../components/UserComponent.vue";
import PencilOutlineIcon from "vue-material-design-icons/PencilOutline.vue";
import FileOutlineIcon from "vue-material-design-icons/FileOutline.vue";
import InboxIcon from "vue-material-design-icons/Inbox.vue";
import SendOutlineIcon from "vue-material-design-icons/SendOutline.vue";
import StarOutlineIcon from "vue-material-design-icons/StarOutline.vue";
import ClockOutlineIcon from "vue-material-design-icons/ClockOutline.vue";
import PlusIcon from "vue-material-design-icons/Plus.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";

const userStore = useUserStore();
let newMessageOpen = ref(false);
let toEmail = ref("");
let subject = ref("");
let body = ref("");
let query = ref("");
let cnt = computed(() => {
  let count = 0;
  for (let email of userStore.emails) {
    if (!email.hasViewed) {
      count++;
    }
  }
  return count;
});

const sendEmail = async () => {
  await userStore.sendEmail({
    toEmail: toEmail.value,
    subject: subject.value,
    body: body.value,
  });
  newMessageOpen.value = false;
  toEmail.value = "";
  subject.value = "";
  body.value = "";
};
const emptyQuery = () => {
  query.value = "";
  userStore.searchEmail(query.value);
};
const searchEmails = () => {
  userStore.searchEmail(query.value);
};
</script>
<style scoped>
.logo-section {
  min-width: 250px;
}

.input-width {
  max-width: 700px;
}

.side-menu-item {
  width: 250px;
}

.side-menu {
  width: 300px;
}

#NewMessageSection {
  width: 560px;
  height: 570px;
}
</style>
