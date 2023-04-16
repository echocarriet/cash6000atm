<template>
  <div class="container-fluid shadow-sm">
    <div class="container py-3">
      <HeaderTemplate></HeaderTemplate>
      <SelectArea></SelectArea>
      <p class="text-muted text-end mb-0">✦ 請開啟定位並允許存取位置資訊</p>
    </div>
  </div>
  <div class="py-5">
    <div class="container text-center">
      <h2 class="mb-4">全民共享普發現金 ATM 資訊</h2>
      <p class="text-muted">選取縣市與區域後，點擊黃色圖示可顯示 ATM 資訊</p>
    </div>
    <MapAtm></MapAtm>
  </div>
  <FooterTemplate></FooterTemplate>
</template>
<script>
import HeaderTemplate from '@/components/HeaderTemplate.vue';
import SelectArea from '@/components/SelectArea.vue';
import MapAtm from '@/components/MapAtm.vue';
import FooterTemplate from '@/components/FooterTemplate.vue';

export default {
  components: {
    HeaderTemplate,
    SelectArea,
    MapAtm,
    FooterTemplate,
  },
};
</script>
