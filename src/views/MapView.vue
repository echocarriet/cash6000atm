<template>
  <div class="container">
    <h3>地圖頁</h3>
    <SelectArea></SelectArea>
    <MapAtm></MapAtm>
  </div>
</template>
<script>
import SelectArea from '@/components/SelectArea.vue';
import MapAtm from '@/components/MapAtm.vue';

export default {
  components: {
    SelectArea,
    MapAtm,
  },
};
</script>
