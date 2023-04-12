<template>
  <div class="container py-4">
    <CountryInfo></CountryInfo>
    <AtmItem></AtmItem>
  </div>
</template>
<script>
import CountryInfo from '@/components/SelectArea.vue';
import AtmItem from '@/components/AtmItem.vue';

export default {
  components: {
    CountryInfo,
    AtmItem,
  },
};
</script>
