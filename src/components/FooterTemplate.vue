<template>
  <footer class="text-center text-muted fs-7 py-3">
    <ul class="list-unstyled d-flex justify-content-center mb-0">
      <li class="footer-item me-3">
        <p class="footer-divider mb-0">© 2023 Carrie Tseng</p>
      </li>
      <li>
        <a
          class="link-underline-light link-secondary"
          href="https://github.com/echocarriet/cash6000atm"
          target="_blank"
        >
          Github Repository
        </a>
      </li>
    </ul>
  </footer>
</template>
<style lang="scss">
.footer-divider {
  position: relative;
  &:after {
    display: inline-block;
    content: '';
    width: 1px;
    height: 14px;
    background: #212529bf;
    position: absolute;
    right: -10px;
    top: 5px;
    opacity: 0.8;
  }
}
</style>
