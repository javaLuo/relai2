<template>
  <div
    ref="bao"
    :class="['root-bao', status]"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchcancel="onTouchEnd"
    @touchend="onTouchEnd"
  >
    <div :class="['talk', { show: talk }]">
      {{ talk }}
    </div>
    <img ref="baoImgRef" class="bao" :src="emoji.src" />

    <div class="prev">
      <img src="@/assets/imgs/bao/sleep.gif" />
      <img src="@/assets/imgs/bao/greet.gif" />
      <img src="@/assets/imgs/bao/sad.gif" />
      <img src="@/assets/imgs/bao/happy.gif" />
      <img src="@/assets/imgs/bao/nie.gif" />
    </div>
  </div>

  <!-- 踢球配套设施 -->
  <img
    :class="['close', { show: !isLoading && status === 'play' }]"
    src="@/assets/imgs/icon-close.png"
    @click="onPlayClose"
  />

  <!-- 球门 -->
  <img :class="['door', {show: status === 'play'}]" src="@/assets/imgs/play/door.png" />

  <!-- 球 -->
  <img ref="ballRef" :class="['ball', {show: status === 'play' }]" src="@/assets/imgs/play/ball.png" @click="onBallSend" />

  <div :class="['testImg', { show: foodClick.food }]">
      <img class="test0" src="@/assets/imgs/test.png" />
      <img
        :class="['test1', { show: foodClick.one }]"
        src="@/assets/imgs/test1.png"
        @click="onFood1"
      />
      <img
        :class="['test2', { show: foodClick.two }]"
        src="@/assets/imgs/test2.png"
        @click="onFood2"
      />
      <img
        :class="['test3', { show: foodClick.three }]"
        src="@/assets/imgs/test3.png"
        @click="onFood3"
      />
    </div>

</template>

<script setup>
import anime from "animejs";
import tools from "@/utils/tools.js";
import { computed, ref, onMounted, watch } from "vue";
import useBaoEmoji from "@/hooks/useBaoEmoji";
import useDrag from "@/hooks/useDrag";
import useBaoTalk from "@/hooks/useBaoTalk";
import useFood from "@/hooks/useFood";
import { useStore } from "vuex";

const emits = defineEmits(["onPlayClose"]);
const props = defineProps({
  status: String,
  food: Boolean,
});

const baoImgRef = ref(null);
const bao = ref(null);
const { emoji, setEmoji } = useBaoEmoji();
let dragTimer = ref(0); // 抓取了多久， 毫秒
let defaultTimer = ref(0);

const store = useStore();
const baoDrag = useDrag(bao);
const { talk, setTalk } = useBaoTalk();
const { foodClick, setFood } = useFood();

onMounted(() => {
  randomEmoji();
});

const talkList = computed(() => {
  let t = store.state.app.talks;
  if(t.length) {
    t = t.filter(talk => Object.keys(talk)[0] === 'system')
  }
  return t;
});

watch(
  () => talkList.value,
  () => {
    const msg = talkList.value[talkList.value.length -1];
    setTalk("", true, msg.system);
  }
);

watch(
  () => emoji.value,
  (newV) => {
    if (newV.type === "nie") {
      setTalk("nie");
    }
  }
);

watch(
  () => props.status,
  (newV) => {
    console.log("watch props.status", newV);
    if (newV === "play") {
      stopRandomEmoji();
      setTalk("play", true);
    }
  }
);

watch(
  () => props.food,
  (newV) => {
    setFood({
      food: newV,
      one: false,
      two: false,
      three: false,
    });
  }
);

// 每3秒取随机表情
function randomEmoji() {
  clearTimeout(defaultTimer.value);
  defaultTimer.value = setTimeout(() => {
    setEmoji("sleep");
    randomEmoji();
  }, 3000);
}

function stopRandomEmoji() {
  clearTimeout(defaultTimer.value);
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

// ============== 玩球  ==============
const ballRef = ref(null);
const isLoading = ref(false);

function onPlayClose() {
  randomEmoji();
  emits("onPlayClose")
  baoImgRef.value.style.transform = '';
}

function onPlayAction(type) {
  const aniObj = {
    x: 0,
  };

  anime({
    targets: aniObj,
    x: type === 0 ? -3 : 3,
    easing: "easeInOutQuad",
    duration: 500,
    update: function () {
      baoImgRef.value.style.transform = `scale(.5, .5) translateY(1rem) translateX(${aniObj.x}rem)`;
    },
    complete: function (anim) {
      setTimeout(() => {
        baoImgRef.value.style.transform = `scale(.5, .5) translateY(1rem) translateX(0rem)`;
      }, 1500);
    },
  });
}

function onBallSend() {
  isLoading.value = true;
  const ref = tools.getRandomInt(0, 1);

  // 得到左边目标点
  const clientHeight = document.documentElement.clientHeight;
  const ballRect = ballRef.value.getBoundingClientRect();
  const targetBall = {
    y: clientHeight / 2 - ballRect.top,
  };

  const baoActionType = tools.getRandomInt(0, 1);
  onPlayAction(baoActionType);

  // 球轨迹
  const ballObj = {
    x: 0,
    y: 0,
    scale: 1,
  };

  let x = 0;
  if (ref === 0) {
    // 左
    x = -1.8;
  } else {
    // 右
    x = 1.8;
  }

  console.log(ref, baoActionType);
  const isHappy = baoActionType === ref;
  anime({
    targets: ballObj,
    x,
    y: targetBall.y,
    scale: 0.3,
    easing: "linear",
    duration: 600,
    update: function () {
      ballRef.value.style.transform = `translate(-50%, 0) scale(${ballObj.scale}, ${ballObj.scale})`;
      ballRef.value.style.translate = `${ballObj.x}rem calc(${ballObj.y}px - 1.4rem)`;
    },
    complete: function (anim) {
      if (isHappy) {
        setEmoji("happy");
      } else {
        setEmoji("sad");
      }
      setTimeout(() => {
        ballRef.value.style.translate = "0rem 0px";
        ballRef.value.style.transform = "translate(-50%, 0) scale(1, 1)";
        isLoading.value = false;
        setEmoji("sleep");
      }, 1500);
    },
  });
}

// ================投喂============
function onFood1() {
  setFood({
    ...foodClick.value,
    one: true,
  });
  setEmoji("sad");
}
function onFood2() {
  setFood({
    ...foodClick.value,
    two: true,
  });
  setEmoji("sad");
}
function onFood3() {
  setFood({
    ...foodClick.value,
    three: true,
  });
  setEmoji("sad");
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
@keyframes ani-food-vertical {
  0% {
    opacity: 0;
    transform: translate(-50%, 120%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 90%);
  }
}
@keyframes ani-food1-vertical {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
    transform: translate(170%, -400%);
  }
  100% {
    opacity: 0;
    transform: translate(180%, -410%);
  }
}
@keyframes ani-food2-vertical {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
    transform: translate(-70%, -400%);
  }
  100% {
    opacity: 0;
    transform: translate(-70%, -410%);
  }
}

@keyframes ani-food3-vertical {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
    transform: translate(-260%, -400%);
  }
  100% {
    opacity: 0;
    transform: translate(-270%, -410%);
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
    transition: all 300ms;
    z-index: 100;
  }
}

.play {
  .bao {
    transform: scale(0.5, 0.5) translateY(1rem);
  }
}

.close{
    position: absolute;
    top: 1rem;
    left: .36rem;
    z-index: 999;
    width: .38rem;
    height: .38rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 300ms;
    &.show{
        opacity: 1;
        pointer-events: auto;
    }
}

.ball{
    position: absolute;
    width: 3rem;
    height: 3rem;
    bottom: -.5rem;
    left: 50%;
    transform: translate(-50%, 0);
    z-index:100;
    transition: opacity 200ms;
    pointer-events: none;
    opacity: 0;
    &.show{
      opacity: 1;
      pointer-events: auto;
    }
}

.door{
    position: absolute;
    width: 6.33rem;
    height: auto;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
    translateY: -1rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms;
    &.show{
      opacity: 1;
    }
}
.testImg {
  position: absolute;
  left: 50%;
  top: 60%;
  bottom: 1.2rem;
  opacity: 0;
  width: 6rem;
  height: 2rem;
  z-index: 100;
  // pointer-events: none;
  &.show {
    opacity: 1;
    animation: ani-food-vertical 0.9s both;
  }
  .test0 {
    width: 6rem;
    height: auto;
  }
  .test1 {
    position: absolute;
    left: 10%;
    transform: translate(-10%, 30%);
    width: 1rem;
    height: 1rem;
    &.show {
      opacity: 0;
      animation: ani-food1-vertical 0.5s both;
    }
  }
  .test2 {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 30%);
    width: 1rem;
    height: 1rem;
    &.show {
      opacity: 0;
      animation: ani-food2-vertical 0.5s both;
    }
  }
  .test3 {
    position: absolute;
    left: 85%;
    transform: translate(-85%, 30%);
    width: 1rem;
    height: 1rem;
    &.show {
      opacity: 0;
      animation: ani-food3-vertical 0.5s both;
    }
  }
}

</style>