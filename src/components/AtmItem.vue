<template>
  <ul class="row g-3 list-unstyled" v-if="atm6000Data.length !== 0">
    <li class="col-md-6" v-for="item in filterSearch" :key="item">
      <div class="card">
        <h3 class="card-header h5">
          {{ `${item.data.所屬銀行簡稱} | ${item.data.裝設地點}` }}
        </h3>
        <div class="card-body">
          <p class="card-text">
            <i class="bi bi-geo-alt-fill"></i>
            {{ `${item.data.所屬縣市}${item.data.鄉鎮縣市別}${item.data.地址} | ` }}
            <a class="link-underline-light" :href="item.mapURL" target="_blank">開啟導航</a>
          </p>
          <p class="card-text">
            <i class="bi bi-clock-fill"></i>
            {{ `${item.openingHour}` }}
          </p>
        </div>
      </div>
    </li>
  </ul>
  <div v-else>
    <p class="text-center text-muted">目前尚無卡片式資料，請先至上方選取縣市與區域</p>
  </div>
</template>
<script>
export default {
  inject: ['emitter'],
  props: ['propsSearchKey'],
  data() {
    return {
      atm6000Data: [],
      searchKey: '',
    };
  },
  mounted() {
    this.emitter.on('emit-render6000Atm', (data) => {
      this.atm6000Data = data;
    });
    this.emitter.on('emit-search', (data) => {
      this.searchKey = data;
    });
  },
  computed: {
    filterSearch() {
      return this.atm6000Data.filter((searchResult) => searchResult.searchValue
        .match(this.searchKey));
    },
  },
};
</script>
