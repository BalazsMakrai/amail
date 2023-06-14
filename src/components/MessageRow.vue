<template>
  <div id="MessageRow" class="hello">
    <div
      class="border-b hover:border-gray-200 hover:border-t hover:border-y-2 hover:border-x cursor-pointer"
    >
      <div class="flex items-center px-4 py-2">
        <div class="flex items-center">
          <component
            :is="CheckboxBlankOutlineIcon"
            :size="19"
            fillcolor="#636363"
          />
          <StarOutlineIcon class="ml-4" :size="19" fillcolor="#636363" />
        </div>
        <div class="flex items-center w-full">
          <router-link to="email/meassage" class="w-full">
            <div class="flex items-center justify-between">
              <div class="flex items-center w-full">
                <div class="text-sm ml-4 font-semibold truncate-from">
                  {{ from }}
                </div>
                <div class="flex items-center justify-between">
                  <div class="text-sm mr-1.5 font-semibold truncate-subject">
                    {{ subject }}
                  </div>
                  <div
                    class="text-sm mr-1.5 font-semibold text-gray-500 truncate-body"
                  >
                    - {{ body }} ...
                  </div>
                </div>
              </div>
              <div
                class="text-right truncate mr-4 w-full text-xs font-semibold"
              >
                {{ time }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps } from "vue";
import CheckboxBlankOutlineIcon from "vue-material-design-icons/CheckboxBlankOutline.vue";
import StarOutlineIcon from "vue-material-design-icons/StarOutline.vue";
//let icon = null;
const props = defineProps({
  from: String,
  subject: String,
  body: String,
  time: String,
});
const { subject, from, body, time } = toRefs(props);
</script>
<style lang="scss">
#MessageRow {
  .truncate-from {
    width: 170px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .truncate-subject {
    max-width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .truncate-from {
    max-width: 300px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
