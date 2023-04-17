<template>
  <button @click="scrollToTop" ref="topButton" class="app-button">
    <i class="bi bi-arrow-up text-primary h5"></i>
  </button>
</template>

<script>
export default {
  methods: {
    userScroll() {
      const appButton = this.$refs.topButton;
      if (window.scrollY > 0) {
        appButton.classList.add('showButton');
      } else {
        appButton.classList.remove('showButton');
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  beforeMount() {
    window.removeEventListener('scroll', this.userScroll);
  },
  mounted() {
    window.addEventListener('scroll', this.userScroll);
  },
};
</script>

<style scoped>
.app-button {
  border-radius: 50%;
  height: 50px;
  width: 50px;
  padding: 4px;
  box-shadow: 3px 3px #e9e9e9;
  cursor: pointer;
  position: fixed;
  bottom: 40px;
  display: none;
  right: 25px;
  z-index: 1999;
  border: 2px solid #3b73a4;
}
.showButton {
  display: block;
}
</style>
