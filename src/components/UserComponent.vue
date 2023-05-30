<template>
  <div id="UserComponent">
    <img @click="openMenu=!openMenu"
      class="rounded-full w-8 cursor-pointer"
      data-tooltip-target="tooltip-no-arrow-user"
      data-tooltip-placement="bottom"
      src="https://via.placeholder.com/40"
    />
  </div>
  <div v-show="!openMenu"
    id="tooltip-no-arrow-user"
    role="tooltip"
    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 delay-150 bg-gray-500 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
  >
    <div>Google Account</div>
    <div class="text-gray-300">John Doe</div>
    <div class="text-gray-300">john.doe@gmail.com</div>
    <div v-show="openMenu" class="absolute z-10 w-80 right-2 bg-white top-14 rounded-lg">
      <div class="w-full flex justify-center">
        <img
          class="rounded-full w-20 mt-4"
          src="https://via.placeholder.com/70"
        />
      </div>
      <div class="w-full flex justify-center text-gray-700 mt-2 text-lg">
        John Doe
      </div>
      <div
        class="w-full flex justify-center text-gray-700 mt-2 text-sm pb-4 border-b"
      >
        john.doe@gmail.com
      </div>
      <div class="flex justify-center my-5">
        <button
        class="bg-transparent text-xs hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-300 rounded"
        >
          Sign out of Amail
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>import {ref} from 'vue';
let openMenu=ref(false);</script>
