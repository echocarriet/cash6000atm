<template>
  <div class="container-fluid shadow">
    <div class="container py-3">
      <HeaderTemplate></HeaderTemplate>
      <SelectArea></SelectArea>
      <button class="btn btn-primary ms-auto d-block" @click="goAnchor('#goMap')">
        <i class="bi bi-geo-fill"></i> 地圖
      </button>
    </div>
  </div>
  <div class="bg-layoutColor py-5">
    <div class="container">
      <h2 class="h3 text-center mb-4">ATM 卡片資訊</h2>
      <AtmItem></AtmItem>
    </div>
  </div>
  <div class="bg-mapColor py-5">
    <h2 class="h3 text-center mb-4" id="goMap">ATM 地圖資訊</h2>
    <MapAtm></MapAtm>
  </div>
  <FooterTemplate></FooterTemplate>
  <TopButton></TopButton>
</template>
<script>
import HeaderTemplate from '@/components/HeaderTemplate.vue';
import SelectArea from '@/components/SelectArea.vue';
import AtmItem from '@/components/AtmItem.vue';
import MapAtm from '@/components/MapAtm.vue';
import FooterTemplate from '@/components/FooterTemplate.vue';
import TopButton from '@/components/TopButton.vue';

export default {
  components: {
    HeaderTemplate,
    SelectArea,
    AtmItem,
    MapAtm,
    FooterTemplate,
    TopButton,
  },
  methods: {
    goAnchor(selector) {
      document.querySelector(selector).scrollIntoView({
        behavior: 'smooth',
      });
    },
  },
};
</script>
