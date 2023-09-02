<template>
  <div class="app-root">
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
export default {
  components: {
    RouterView,
  },
  mounted() {
    this.autoHtmlFontSize();
    window.addEventListener("resize", this.autoHtmlFontSize, false);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.autoHtmlFontSize, false);
  },

  methods: {
    autoHtmlFontSize() {
      console.log(document.documentElement);
      let basicWidth = 750;
      let minWidth = 0;
      // if (document.documentElement.clientWidth <= 750) {
      //   basicWidth = 750;
      // }

      const clientW = document.documentElement.clientWidth;
      const w = Math.max(minWidth, clientW);
      const fontSize = Math.min((w / basicWidth) * 100, 100);
      // const scale = Math.min(w / basicWidth, 1);
      document.documentElement.style.fontSize = `${fontSize}px`;
      // return { w: w, h: document.documentElement.clientHeight, fontSize, scale };
    },
  },
};
</script>

<style lang="less">
.app-root {
  position: relative;
  min-height: 100vh;
  width: 7.5rem;
  background-color: #000;
  margin: 0 auto;
}
</style>
