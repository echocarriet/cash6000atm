<template>
  <p class="text-muted text-center mb-2">✦ 請開啟定位並允許存取位置資訊</p>
  <p class="text-muted text-center mb-4">可縮放地圖查看篩選後的區域 ATM，點擊黃色圖示可顯示 ATM 資訊</p>
  <div id="map" class="position-relative">
  </div>
</template>
<script>
import { toRaw } from 'vue';

export default {
  inject: ['emitter', 'L', 'control'],
  data() {
    return {
      atm6000Data: [],
      searchKey: '',
      osm: null,
    };
  },
  methods: {
    // 1.抓取使用者所在位置
    getNowLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(`經度:${position.coords.latitude}, 緯度:${position.coords.longitude}`);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.leafletMap(lat, lon);
      });
    },
    // 2.建立 Leaflet 地圖
    leafletMap(lat, lon) {
      // 產生地圖
      const osm = this.L.map('map').setView([lat, lon], 15);
      // 從 Leaflet新增一個圖資的圖層加入到地圖上
      this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(osm);

      // 使用者位置
      this.L.circle([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 150,
      })
        .bindPopup('<b>您目前所在位置 ✌️</b>')
        .addTo(osm)
        .openPopup();
      this.osm = osm;
      // leaflet 外掛 Leaflet.Locate
      this.L.control.locate().addTo(toRaw(this.osm)).start();
    },
    clearMarkers() {
      // 清除地圖所有標記
      toRaw(this.osm).eachLayer((layer) => {
        if (layer instanceof this.L.Marker) {
          toRaw(this.osm).removeLayer(layer);
        }
      });
    },
    atmLeafletMap() {
      const atmIcon = this.L.icon({
        iconUrl:
          'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      this.filterSearch.forEach((item) => {
        const atmLat = item.data.座標Y軸;
        const atmLon = item.data.座標X軸;
        this.L.marker([atmLat, atmLon], { icon: atmIcon })
          .bindPopup(
            `<h3 class="h5">${item.data.所屬銀行簡稱} | ${item.data.裝設地點}</h3>
            <p>
              <i class="bi bi-geo-alt-fill"></i>
              ${item.data.所屬縣市}${item.data.鄉鎮縣市別}${item.data.地址}  | 
              <a class="link-underline-light" href="${item.mapURL}" target="_blank">導航</a>
            </p>
            <p>
            <i class="bi bi-clock-fill"></i> ${item.openingHour}  
            </p>`,
          )
          .addTo(toRaw(this.osm)); // Make sure to "unproxy" the map before using it with Leaflet

        // 移動 maker 到搜尋的 ATM 位置
        toRaw(this.osm).panTo(this.L.latLng([atmLat, atmLon]));
      });
    },
  },
  mounted() {
    this.getNowLocation();
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
  watch: {
    filterSearch() {
      this.clearMarkers();
      this.atmLeafletMap();
    },
  },
};
</script>
<style lang="scss">
#map {
  // height: 500px;
  height: 80vh;
}

</style>
