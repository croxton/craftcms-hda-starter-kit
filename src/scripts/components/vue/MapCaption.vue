<script>
export default {
  name: "MapCaption",
  props: {
    caption:{
      type: [String, null],
      default: null
    },
  },
}
</script>

<template>
  <p class="bg-gray-200 p-4 italic">
    {{ caption }}
  </p>
</template>

<style>
</style>