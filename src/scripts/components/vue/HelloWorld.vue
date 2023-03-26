<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1
    class="bg-gradient-to-r from-green-600 to-sky-400 bg-clip-text text-5xl font-black text-transparent selection:bg-transparent"
  >
    {{ msg }}
  </h1>

  <button
    type="button"
    class="my-6 rounded bg-gray-300 px-4 py-2 transition-all hover:bg-gray-200"
    @click="count++"
  >
    count is: {{ count }}
  </button>
  <p>
    Edit
    <code class="text-gray-400">src/scripts/components/vue/HelloWorld.vue</code> to test hot
    module replacement.
  </p>
</template>

<style scoped></style>
