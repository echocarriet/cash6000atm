<template>
  <router-view />
</template>

<style lang="scss">
@import '@/assets/stylesheets/all';
@import '~leaflet/dist/leaflet.css';
@import url(https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css);
</style>

<script>
import emitter from '@/methods/eventBus';
import L from 'leaflet';

export default {
  provide() {
    return {
      emitter,
      L,
    };
  },
};
</script>
