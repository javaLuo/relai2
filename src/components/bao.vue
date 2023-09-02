<template>
  <div class="root-bao">
    <div v-show="!baoDrag.isDraging.value" class="talk">
      怎么了？我一直在这陪着你
    </div>
    <img
      ref="bao"
      class="bao"
      :src="emoji"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchcancel="onTouchEnd"
      @touchend="onTouchEnd"
    />

    <div class="prev">
      <img src="@/assets/imgs/bao/sleep.gif" />
      <img src="@/assets/imgs/bao/greet.gif" />
      <img src="@/assets/imgs/bao/sad.gif" />
      <img src="@/assets/imgs/bao/happy.gif" />
      <img src="@/assets/imgs/bao/nie.gif" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useBaoEmoji from "@/hooks/useBaoEmoji";
import useDrag from "@/hooks/useDrag";

const bao = ref(null);
const { emoji, setEmoji } = useBaoEmoji();
let dragTimer = ref(0); // 抓取了多久， 毫秒
let defaultTimer = ref(0);

const baoDrag = useDrag(bao);
console.log("isDraging", baoDrag.isDraging.value);

onMounted(() => {
  randomEmoji();
});

// 每3秒取随机表情
function randomEmoji() {
  clearTimeout(defaultTimer.value);
  defaultTimer.value = setTimeout(() => {
    setEmoji("sleep");
    randomEmoji();
  }, 3000);
}

function onTouchStart(e) {
  setEmoji("greet");
  baoDrag.onTouchStart(e);
  dragTimer.value = Date.now();
  clearTimeout(defaultTimer.value);
}

function onTouchMove(e) {
  setEmoji("nie");
  baoDrag.onTouchMove(e);
}

function onTouchEnd() {
  baoDrag.onTouchEnd();
  if (Date.now() - dragTimer.value >= 3000) {
    // TODO 抓取超过3秒，眩晕表情
    setEmoji("happy");
  } else {
    setEmoji("greet");
  }
  randomEmoji();
}
</script>

<style lang="less" setup>
.root-bao {
  position: absolute;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  .prev {
    width: 1px;
    height: 1px;
    pointer-events: none;
    overflow: hidden;
    opacity: 0;
    z-index: -1;
  }
  .talk {
    position: absolute;
    left: 50%;

    transform: translateX(-50%) translateY(-0.1rem);
    width: 4rem;
    max-height: 3rem;
    border: 3px solid #ffffff;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 0.15rem;
    font-size: 0.28rem;
    font-family: Source Han Sans CN, sans-serif;
    font-weight: 400;
    color: #333333;
    line-height: 0.58rem;
    text-align: center;
    word-break: break-all;
    line-break: anywhere;
  }
  .bao {
    position: relative;
    width: 4.85rem;
    height: auto;
  }
}
</style>