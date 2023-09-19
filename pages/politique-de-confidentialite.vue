<script setup>
const query = groq`*[_type == "policy"][0]`
const { data: policy } = useSanityQuery(query)
</script>

<template>
  <div class="l-policy">
    <Annex :data="policy" />
  </div>
</template>

<style lang="scss" scoped>
// ...
</style>
