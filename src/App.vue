<template>
  <router-view />
</template>
<script>
import emitter from '@/methods/eventBus';
import L from 'leaflet';
import control from 'leaflet.locatecontrol';

export default {
  provide() {
    return {
      emitter,
      L,
      control,
    };
  },
};
</script>

<style lang="scss">
@import '@/assets/stylesheets/all';
@import '~leaflet/dist/leaflet.css';
@import '~leaflet.locatecontrol/dist/L.Control.Locate.css';
@import url(https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css);
</style>
