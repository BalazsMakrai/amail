<template>
  <div id="IconComponent" class="hello">
    <div
      class="flex items-center justify-center rounded-full cursor-pointer w-10 h-10"
      :class="[hoverColor]"
      :data-tooltip-target="`tooltip-no-arrow-${iconString}`"
      data-tooltip-placement="bottom"
    >
      <component :is="icon" :size="iconSize" :fillColor="iconColor" />
    </div>
    <div
      :id="`tooltip-no-arrow-${iconString}`"
      role="tooltip"
      class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 delay-150 bg-gray-500 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps } from "vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";
import TuneIcon from "vue-material-design-icons/Tune.vue";
import HelpIcon from "vue-material-design-icons/Help.vue";
import CogOutlineIcon from "vue-material-design-icons/CogOutline.vue";
import AppsIcon from "vue-material-design-icons/Apps.vue";
import ArrowLeftIcon from "vue-material-design-icons/ArrowLeft.vue";
import TrashCanOutlineIcon from "vue-material-design-icons/TrashCanOutline.vue";
let icon = null;
const props = defineProps({
  iconString: String,
  iconColor: String,
  iconSize: Number,
  text: String,
  hoverColor: String,
});
const { iconString, iconColor, text, hoverColor } = toRefs(props);
if (iconString.value === "menu") {
  icon = MenuIcon;
} else if (iconString.value === "magnify") {
  icon = MagnifyIcon;
} else if (iconString.value === "tune") {
  icon = TuneIcon;
} else if (iconString.value === "help") {
  icon = HelpIcon;
} else if (iconString.value === "cog") {
  icon = CogOutlineIcon;
} else if (iconString.value === "apps") {
  icon = AppsIcon;
} else if (iconString.value === "back") {
  icon = ArrowLeftIcon;
} else if (iconString.value === "trash") {
  icon = TrashCanOutlineIcon;
}
</script>
