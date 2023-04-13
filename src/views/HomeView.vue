<template>
  <div class="container py-4">
    <SelectArea></SelectArea>
    <AtmItem></AtmItem>
  </div>
</template>
<script>
import SelectArea from '@/components/SelectArea.vue';
import AtmItem from '@/components/AtmItem.vue';

export default {
  components: {
    SelectArea,
    AtmItem,
  },
};
</script>
