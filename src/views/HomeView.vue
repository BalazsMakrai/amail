<template>
  <div
    id="HomeView"
    class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm pt-2" v-if="userStore.emails.length"
  >
    <div class="border-b" >
      <div class="flex items-center justify-between px-4 my-3">
        <IconComponent
          @click="deleteSelected"
          class="-m-2 -ml-2.5"
          iconString="trash"
          iconColor="#636363"
          :iconSize="19"
          hoverColor="hover:bg-gray-200"
          text="Delete selected"
        />
      </div>
    </div>
    <div>
      <div v-for="email in userStore.emails" :key="email">
        <MessageRow
          :id="email.id"
          :from="email.firstName + ' ' + email.lastName"
          :subject="email.subject"
          :body="email.body"
          :hasViewed="email.hasViewed"
          :time="email.createdAt"
          @selectedId="selectedId"
        />
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center w-full h-full text-3xl">Sorry, nothing to show here...</div>
</template>

<script setup>
import IconComponent from "@/components/IconComponent.vue";
import MessageRow from "@/components/MessageRow.vue";
import { onMounted } from "vue";
import { useUserStore } from "@/store/user-store";
const userStore = useUserStore();

let emailsToDelete = [];
onMounted(() => {
  userStore.getEmailsByEmailAddress();
});
const selectedId = (e) => {
  if (!emailsToDelete.length) {
    emailsToDelete.push(e.id);
  } else if (e.bool && !emailsToDelete.includes(e.id)) {
    emailsToDelete.push(e.id);
  } else if (!e.bool && emailsToDelete.includes(e.id)) {
    const index = emailsToDelete.indexOf(e.id);
    if (index > -1) {
      emailsToDelete.splice(index, 1);
    }
  }
};

const deleteSelected = () => {
  if (!emailsToDelete.length) {
    return;
  }
  let res = confirm("Are you sure you want to delete the selected emails?");
  if (res) {
    emailsToDelete.forEach(async (id) => {
      await userStore.deleteEmail(id);
    });
    emailsToDelete = [];
  }
};
</script>
