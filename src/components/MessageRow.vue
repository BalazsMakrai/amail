<template>
  <div id="MessageRow">
    <div
      class="border-b hover:border-gray-200 hover:border-t hover:border-y-2 hover:border-x cursor-pointer"
      :class="[hasViewed ? '' : 'bg-gray-200']"
    >
      <div class="flex items-center px-4 py-2">
        <div class="flex items-center">
          <component
            @click="isSelected = !isSelected"
            :is="isSelected ? CheckboxOutlineIcon : CheckboxBlankOutlineIcon"
            :size="19"
            fillcolor="#636363"
          />
          <StarOutlineIcon class="ml-4" :size="19" fillcolor="#636363" />
        </div>
        <div class="flex items-center w-full">
          <router-link :to="`/email/message/${id}`" class="w-full">
            <div class="flex items-center justify-between">
              <div class="flex items-center w-full">
                <div
                  class="text-sm ml-4 truncate-from"
                  :class="[hasViewed ? 'font-normal' : 'font-bold']"
                >
                  {{ from }}
                </div>
                <div class="flex items-center justify-between">
                  <div
                    class="text-sm mr-1.5 truncate-subject"
                    :class="[hasViewed ? 'font-normal' : 'font-bold']"
                  >
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
                class="text-right truncate mr-4 w-full text-xs"
                :class="[hasViewed ? 'font-normal' : 'font-bold']"
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
import { toRefs, ref, defineProps, defineEmits, watch } from "vue";
import CheckboxBlankOutlineIcon from "vue-material-design-icons/CheckboxBlankOutline.vue";
import CheckboxOutlineIcon from "vue-material-design-icons/CheckboxOutline.vue";
import StarOutlineIcon from "vue-material-design-icons/StarOutline.vue";

const emit = defineEmits(["selectedId"]);
let isSelected = ref(false);

watch(isSelected, (bool) => {
  emit("selectedId", { id: id.value, bool: bool });
});
const props = defineProps({
  id: String,
  from: String,
  subject: String,
  body: String,
  time: String,
  hasViewed: Boolean,
});
const { subject, from, body, time, id, hasViewed } = toRefs(props);
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
