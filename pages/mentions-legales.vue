<script setup>
const query = groq`*[_type == "legal"][0]`
const { data: legal } = useSanityQuery(query)
</script>

<template>
  <div class="l-legal">
    <Annex :data="legal" />
  </div>
</template>

<style lang="scss" scoped>
// ...
</style>
