<template>
  <div class="container-fluid shadow">
    <div class="container py-3">
      <HeaderTemplate></HeaderTemplate>
      <SelectArea></SelectArea>
      <p class="text-muted text-end mb-0">✦ 請先選取縣市與區域</p>
    </div>
  </div>
  <div class="window-vh100 bg-layoutColor">
    <div class="container py-5">
      <h2 class="text-center mb-4">全民共享普發現金 ATM 資訊</h2>
      <AtmItem></AtmItem>
    </div>
  </div>
  <router-link
    to="/map"
    class="btn btn-primary btn-sm fixed-bottom"
    style="bottom: 42px; right: 20px; left: auto"
  >
    <i class="bi bi-geo-fill"></i> 地圖
  </router-link>
  <FooterTemplate></FooterTemplate>
</template>
<script>
import HeaderTemplate from '@/components/HeaderTemplate.vue';
import SelectArea from '@/components/SelectArea.vue';
import AtmItem from '@/components/AtmItem.vue';
import FooterTemplate from '@/components/FooterTemplate.vue';

export default {
  components: {
    HeaderTemplate,
    SelectArea,
    AtmItem,
    FooterTemplate,
  },
};
</script>
