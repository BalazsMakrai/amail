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
      <div class="w-full text-xl ml-20 font-light pt-5">Subject</div>
      <div class="w-full flex">
        <img
          class="rounded-full mt-8 mx-5 custom-img"
          src="https://via.placeholder.com/45"
        />
        <div class="w-full my-4 mx-0.5">
          <div class="font-semibold text-sm mt-4 mb-4">
            <div class="w-full flex justify-between items-center">
              <div>john.doe@gmail.com</div>
              <div class="mr-5 text-xs font-normal">June 20 14:15</div>
            </div>
            <span class="text-xs text-gray-500 font-normal">to me</span>
          </div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, quisquam. Libero, dolores debitis reprehenderit nesciunt esse voluptate veniam, numquam atque eveniet excepturi temporibus culpa earum quia tenetur dolorem ut quasi!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//import { toRefs, defineProps } from "vue";
import IconComponent from "@/components/IconComponent.vue";
//import StarOutlineIcon from "vue-material-design-icons/StarOutline.vue";
//let icon = null;
//const props = defineProps({
// from: String,
//subject: String,
//body: String,
//time: String,
//});
//const { subject, from, body, time } = toRefs(props);
</script>
+
<style lang="scss">
#SingleMessageSection {.custom-img{width: 40px;height: 40px;}
}
</style>
