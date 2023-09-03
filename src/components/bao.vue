<template>
  <div
    class="root-bao"
    ref="bao"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchcancel="onTouchEnd"
    @touchend="onTouchEnd"
  >
    <div :class="['talk', { show: talk }]">
      {{ talk }}
    </div>
    <img class="bao" :src="emoji.src" />

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
import { ref, onMounted, watch } from "vue";
import useBaoEmoji from "@/hooks/useBaoEmoji";
import useDrag from "@/hooks/useDrag";
import useBaoTalk from "@/hooks/useBaoTalk";

const bao = ref(null);
const { emoji, setEmoji } = useBaoEmoji();
let dragTimer = ref(0); // 抓取了多久， 毫秒
let defaultTimer = ref(0);

const baoDrag = useDrag(bao);
const { talk, setTalk } = useBaoTalk();

onMounted(() => {
  randomEmoji();
});

watch(
  () => emoji.value,
  (newV) => {
    if (newV.type === "nie") {
      setTalk("nie");
    }
  }
);

// computed(
//   () => talk.value,
//   (newV) => {
//     if (newV) {
//       talkTxt.value = newV;
//       setTimeout(()=>{

//       }, 3000);
//     }
//   }
// );

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
@keyframes ani-jello-vertical {
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(0.75, 1.25, 1);
  }
  40% {
    transform: scale3d(1.25, 0.75, 1);
  }
  50% {
    transform: scale3d(0.85, 1.15, 1);
  }
  65% {
    transform: scale3d(1.05, 0.95, 1);
  }
  75% {
    transform: scale3d(0.95, 1.05, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

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
    bottom: 5.2rem;
    translate: -50% -0.1rem;
    width: 4.5rem;
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

    opacity: 0;
    pointer-events: none;
    &.show {
      opacity: 1;
      animation: ani-jello-vertical 0.9s both;
    }
  }
  .bao {
    position: relative;
    width: 4.85rem;
    height: auto;
  }
}
</style>