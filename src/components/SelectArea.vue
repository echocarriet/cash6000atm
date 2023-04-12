<template>
  <div class="row">
    <div class="col-md-4">
      <select
        class="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
        ref="selectCity"
        @change="renderTown"
      >
        <option selected disabled value="chooseCity">請選擇縣市</option>
        <option :value="item.City" v-for="item in cityNameData" :key="item">
          {{ item.CityName }}
        </option>
      </select>
    </div>
    <div class="col-md-4">
      <select
        class="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
        ref="selectTown"
        @change="render6000Atm"
      >
        <option selected disabled value="chooseTown">請選擇區域</option>
        <option :value="item.TownName" v-for="item in townNameData" :key="item">
          {{ item.TownName }}
        </option>
      </select>
    </div>
    <div class="col-md-4">
      <input
        type="search"
        class="form-control form-control-lg mb-3"
        placeholder="搜尋"
        aria-label="searchKey"
        v-model.trim="searchKey"
        :disabled="showDisabled"
        @input="filterSearch"
      />
    </div>
  </div>
</template>
<script>
export default {
  inject: ['emitter'],
  data() {
    return {
      cityNameData: [], // 所有縣市
      townNameData: [], // 指定縣市之區域
      atmData: [], // 6000ATM.json
      atm6000Data: [], // 指定區域的ATM
      searchKey: '',
    };
  },
  methods: {
    getAuthorizationHeader() {
      const urlPath = `${process.env.VUE_APP_TDXAPI}auth/realms/TDXConnect/protocol/openid-connect/token`;
      const parameter = {
        grant_type: 'client_credentials',
        client_id: `${process.env.VUE_APP_TDXID}`,
        client_secret: `${process.env.VUE_APP_TDXKEY}`,
      };
      this.$http({
        method: 'POST',
        url: urlPath,
        dataType: 'JSON',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: this.$qs.stringify(parameter),
      })
        .then((res) => {
          this.$http.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
          this.getAllCity();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCity() {
      const cityUrl = `${process.env.VUE_APP_TDXAPI}api/basic/v2/Basic/City?%24format=JSON`;
      this.$http(cityUrl)
        .then((res) => {
          this.cityNameData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTown() {
      const urlPath = `${process.env.VUE_APP_TDXAPI}auth/realms/TDXConnect/protocol/openid-connect/token`;
      const parameter = {
        grant_type: 'client_credentials',
        client_id: `${process.env.VUE_APP_TDXID}`,
        client_secret: `${process.env.VUE_APP_TDXKEY}`,
      };
      this.$http({
        method: 'POST',
        url: urlPath,
        dataType: 'JSON',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: this.$qs.stringify(parameter),
      })
        .then((res) => {
          this.$http.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
          const url = `${process.env.VUE_APP_TDXAPI}api/basic/v2/Basic/City/${this.$refs.selectCity.value}/Town?%24format=JSON`;
          this.$http(url)
            .then((cityRes) => {
              // console.log(cityRes.data);
              this.townNameData = cityRes.data;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    renderTown() {
      this.$refs.selectTown.value = 'chooseTown';
      this.atm6000Data = [];
      this.getTown();
      this.emitter.emit('emit-render6000Atm', this.atm6000Data);
    },
    get6000Atm() {
      const api = `${process.env.VUE_APP_6000ATMAPI}`;
      this.$http
        .get(api)
        .then((res) => {
          this.atmData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    render6000Atm() {
      // 先清空，避免 @change 別的區域一直累加舊的區域資料上去 selectTown
      this.atm6000Data = [];
      this.searchKey = '';
      this.atmData.forEach((item) => {
        let openingHourStatus = '';
        if (item.服務型態 === 'N') {
          openingHourStatus = '9:00~15:30';
        } else if (item.服務型態 === 'E') {
          openingHourStatus = '9:00~22:00';
        } else if (item.服務型態 === '9') {
          openingHourStatus = '24 小時營業';
        }
        if (this.$refs.selectTown.value === item.鄉鎮縣市別) {
          const atmInfo = {
            data: item,
            mapURL: `https://www.google.com/maps/place/${item.座標Y軸},${item.座標X軸}`,
            openingHour: openingHourStatus,
            searchValue: `${item.所屬銀行簡稱}${item.裝設地點}${item.地址}`,
          };
          this.atm6000Data.push(atmInfo);
        }
      });
      this.emitter.emit('emit-render6000Atm', this.atm6000Data);
      this.emitter.emit('emit-search', this.searchKey);
    },
    filterSearch() {
      this.emitter.emit('emit-search', this.searchKey);
    },
  },
  computed: {
    showDisabled() {
      return this.atm6000Data.length === 0 ? 1 : 0;
    },
  },
  mounted() {
    this.getAuthorizationHeader();
    this.get6000Atm();
  },
};
</script>
