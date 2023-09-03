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

    <div :class="['clean-info', { show: isCleanShow }]">
      今日打扫 {{ cleanInfo.todayNum }} / {{ cleanInfo.maxNum }}
    </div>

    <div :class="['heart-info', { show: isHeartShow }]">心情值+1</div>

    <img ref="baoImgRef" class="bao" :src="emoji.src" />

    <!-- 预加载图片 -->
    <div class="prev" v-show="prevLoad">
      <img src="@/assets/imgs/bao/sleep.gif" />
      <img src="@/assets/imgs/bao/greet.gif" />
      <img src="@/assets/imgs/bao/sad.gif" />
      <img src="@/assets/imgs/bao/happy.gif" />
      <img src="@/assets/imgs/bao/nie.gif" />
      <img src="@/assets/imgs/bao/ball1.gif" />
      <img src="@/assets/imgs/bao/ball2.gif" />
      <img src="@/assets/imgs/bao/eat.gif" />
      <img src="@/assets/imgs/bao/wait.gif" />
      <img src="@/assets/imgs/bao/food.gif" @load="onImgLoaded" />
    </div>
  </div>

  <img
    :class="[
      'hand',
      {
        show: isHandShow && status === 'play',
        play: status === 'play',
        food: status === 'food',
      },
    ]"
    src="@/assets/imgs/hand.gif"
  />

  <!-- 踢球配套设施 -->
  <img
    :class="['close', { show: !isLoading && status === 'play' }]"
    src="@/assets/imgs/icon-close.png"
    @click="onPlayClose"
  />

  <!-- 球门 -->
  <img
    :class="['door', { show: status === 'play' }]"
    src="@/assets/imgs/play/door.png"
  />
  <img
    ref="ballRef"
    :class="['ball', { show: status === 'play' }]"
    src="@/assets/imgs/play/ball.png"
    @click="onBallSend"
  />

  <!-- 清扫逻辑 -->
  <div
    v-for="item in objsArr"
    :key="item.id"
    :class="[
      'rabish',
      { show: status === 'normal', clean: item.type === 'clean' },
    ]"
    @click="onClean(item.id)"
    :style="{ left: `${item.x}rem`, top: `${item.y}px` }"
  >
    <img
      class="rabish-icon"
      :src="item.src"
      :style="{ width: `${item.w}rem` }"
    />
    <img class="rabish-clean" src="@/assets/imgs/clean/clean.gif" />
  </div>

  <!-- 投喂配套设施 -->
  <img
    :class="['close', { show: !isLoading && status === 'food' }]"
    src="@/assets/imgs/icon-close.png"
    @click="onFoodClose"
  />

  <div :class="['boardImg', { show: foodClick.food }]">
    <img
      :class="[
        'hand',
        {
          show: isHandShow && status === 'food',
          play: status === 'play',
          food: status === 'food',
        },
      ]"
      src="@/assets/imgs/hand.gif"
    />
    <img class="img0" src="@/assets/imgs/food/0.png" />
    <div>
      <img class="plate1" src="@/assets/imgs/food/plate.png" />
      <img
        :class="['img1', { show: foodClick.one }]"
        src="@/assets/imgs/food/1.png"
        @click="onFood1"
      />
    </div>
    <div>
      <img class="plate2" src="@/assets/imgs/food/plate.png" />
      <img
        :class="['img2', { show: foodClick.two }]"
        src="@/assets/imgs/food/2.png"
        @click="onFood2"
      />
    </div>
    <div>
      <img class="plate3" src="@/assets/imgs/food/plate.png" />
      <img
        :class="['img3', { show: foodClick.three }]"
        src="@/assets/imgs/food/3.png"
        @click="onFood3"
      />
    </div>
    <div>
      <img class="plate4" src="@/assets/imgs/food/plate.png" />
      <img
        :class="['img4', { show: foodClick.four }]"
        src="@/assets/imgs/food/4.png"
        @click="onFood4"
      />
    </div>
    <div>
      <img class="plate5" src="@/assets/imgs/food/plate.png" />
      <img
        :class="['img5', { show: foodClick.five }]"
        src="@/assets/imgs/food/5.png"
        @click="onFood5"
      />
    </div>
  </div>
</template>

<script setup>
import anime from "animejs";
import tools from "@/utils/tools.js";
import { computed, ref, onMounted, watch } from "vue";
import useBaoEmoji from "@/hooks/useBaoEmoji";
import useDrag from "@/hooks/useDrag";
import useBaoTalk from "@/hooks/useBaoTalk";
import useClean from "@/hooks/useClean";
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
  randomEmoji("sleep");
});

const talkList = computed(() => {
  let t = store.state.app.talks;
  if (t.length) {
    t = t.filter((talk) => Object.keys(talk)[0] === "system");
  }
  return t;
});

watch(
  () => talkList.value,
  () => {
    const msg = talkList.value[talkList.value.length - 1];
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
    if (newV === "play") {
      stopRandomEmoji();
      setTalk("play", true);
      setEmoji("ball1");
      isHandShow.value = true;
    } else if (newV === "food") {
      stopRandomEmoji();
      setEmoji("food");
      isHandShow.value = true;
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
      four: false,
      five: false,
    });
  }
);

// 心情标题
const isHeartShow = ref(false);
const isHandShow = ref(false);

const prevLoad = ref(true);
function onImgLoaded() {
  prevLoad.value = false;
}

// 每3秒取随机表情
function randomEmoji(def) {
  clearTimeout(defaultTimer.value);
  defaultTimer.value = setTimeout(() => {
    setEmoji(def || "sleep");
    randomEmoji(def);
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
  randomEmoji("wait");
}

// ============== 玩球  ==============
const ballRef = ref(null);
const isLoading = ref(false);

function onPlayClose() {
  setEmoji("wait");
  randomEmoji("wait");
  emits("onPlayClose");
  baoImgRef.value.style.transform = "";
  isHandShow.value = false;
}

function onPlayAction(type) {
  const aniObj = {
    x: 0,
  };

  anime({
    targets: aniObj,
    x: type === 0 ? -3 : 3,
    easing: "easeInOutQuad",
    duration: 700,
    update: function () {
      baoImgRef.value.style.transform = `scale(.5, .5) translateY(1rem) translateX(${aniObj.x}rem)`;
    },
    complete: function () {
      setTimeout(() => {
        baoImgRef.value.style.transform = `scale(.5, .5) translateY(1rem) translateX(0rem)`;
      }, 1500);
    },
  });
}

function onBallSend() {
  isHandShow.value = false;
  if (isLoading.value) return;
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
    rotate: 0,
  };

  let x = 0;
  if (ref === 0) {
    // 左
    x = -1.8;
  } else {
    // 右
    x = 1.8;
  }

  const isHappy = baoActionType === ref;
  setEmoji("ball2");
  anime({
    targets: ballObj,
    x,
    y: targetBall.y,
    rotate: 360,
    scale: 0.3,
    easing: "linear",
    duration: 800,
    update: function () {
      ballRef.value.style.transform = `translate(-50%, 0) scale(${ballObj.scale}, ${ballObj.scale}) rotate(${ballObj.rotate}deg)`;
      ballRef.value.style.translate = `${ballObj.x}rem calc(${ballObj.y}px - 1.4rem)`;
    },
    complete: function () {
      if (isHappy) {
        setEmoji("happy");
        store.dispatch("app/addLoves", 1);
        isHeartShow.value = true;
      } else {
        setEmoji("sad");
      }
      setTimeout(() => {
        ballRef.value.style.translate = "0rem 0px";
        ballRef.value.style.transform = "translate(-50%, 0) scale(1, 1)";
        isLoading.value = false;
        isHeartShow.value = false;
        setEmoji("ball1");
      }, 1800);
    },
  });
}

// ================投喂============
function onFood1() {
  setFood({
    ...foodClick.value,
    one: true,
  });
  setEmoji("eat");
  eatDone();
  store.dispatch("app/addLoves", 1);
  isHandShow.value = false;
}
function onFood2() {
  setFood({
    ...foodClick.value,
    two: true,
  });
  setEmoji("eat");
  eatDone();
  store.dispatch("app/addLoves", 1);
  isHandShow.value = false;
}
function onFood3() {
  setFood({
    ...foodClick.value,
    three: true,
  });
  setEmoji("eat");
  eatDone();
  store.dispatch("app/addLoves", 1);
  isHandShow.value = false;
}
function onFood4() {
  setFood({
    ...foodClick.value,
    four: true,
  });
  setEmoji("eat");
  eatDone();
  store.dispatch("app/addLoves", 1);
  isHandShow.value = false;
}
function onFood5() {
  setFood({
    ...foodClick.value,
    five: true,
  });
  setEmoji("eat");
  eatDone();
  store.dispatch("app/addLoves", 1);
  isHandShow.value = false;
}

const timerEat = ref(0);
function eatDone() {
  isHeartShow.value = true;
  clearTimeout(timerEat.value);
  timerEat.value = setTimeout(() => {
    isHeartShow.value = false;
    setEmoji("food");
  }, 2000);
}

function onFoodClose() {
  clearTimeout(timerEat.value);
  setEmoji("wait");
  randomEmoji("wait");
  emits("onFoodClose");
  isHandShow.value = false;
}

// 打扫清洁
const { cleanInfo, objsArr, clearOne, isCleanShow } = useClean();
function onClean(index) {
  clearOne(index);
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
    transform: translate(-50%, 20%);
  }
}
@keyframes ani-food1-vertical {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
    transform: translate(90%, -110%);
  }
  100% {
    opacity: 0;
    transform: translate(100%, -130%);
  }
}
@keyframes ani-food2-vertical {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
    transform: translate(100%, -300%);
  }
  100% {
    opacity: 0;
    transform: translate(110%, -320%);
  }
}

@keyframes ani-food3-vertical {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
    transform: translate(0%, -170%);
  }
  100% {
    opacity: 0;
    transform: translate(0%, -190%);
  }
}

@keyframes ani-food4-vertical {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
    transform: translate(-110%, -170%);
  }
  100% {
    opacity: 0;
    transform: translate(-130%, -190%);
  }
}

@keyframes ani-food5-vertical {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
    transform: translate(-110%, -440%);
  }
  100% {
    opacity: 0;
    transform: translate(-130%, -460%);
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

  .clean-info {
    position: absolute;
    width: 2.7rem;
    height: 0.67rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0.67rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    line-height: 0.67rem;
    font-size: 0.29rem;
    font-family: Source Han Sans CN, sans-serif;
    font-weight: 400;
    color: #ffffff;
    bottom: 6rem;
    opacity: 0;
    transition: opacity 300ms;
    pointer-events: none;
    &.show {
      opacity: 1;
    }
  }

  .heart-info {
    position: absolute;
    width: 1.94rem;
    height: 0.67rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0.67rem;
    left: 50%;
    transform: translateX(-50%) translateY(0.2rem);
    text-align: center;
    line-height: 0.67rem;
    font-size: 0.29rem;
    font-family: Source Han Sans CN, sans-serif;
    font-weight: 400;
    color: #ffffff;
    bottom: 7rem;
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
    pointer-events: none;

    &.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  .bao {
    position: relative;
    width: 4.85rem;
    height: auto;
    transition: all 300ms;
    z-index: 100;
    pointer-events: none;
  }
}

.play {
  .bao {
    transform: scale(0.5, 0.5) translateY(1rem);
  }
}

.close {
  position: absolute;
  top: 1rem;
  left: 0.36rem;
  z-index: 999;
  width: 0.38rem;
  height: 0.38rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms;
  &.show {
    opacity: 1;
    pointer-events: auto;
  }
}

.ball {
  position: absolute;
  width: 3rem;
  height: 3rem;
  bottom: -0.5rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
  transition: opacity 200ms;
  pointer-events: none;
  opacity: 0;
  &.show {
    opacity: 1;
    pointer-events: auto;
  }
}

.door {
  position: absolute;
  width: 6.33rem;
  height: auto;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
  translatey: -1rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms;
  &.show {
    opacity: 1;
  }
}

.rabish {
  position: absolute;
  height: auto;
  z-index: 101;
  opacity: 0;
  pointer-events: none;
  &.show {
    opacity: 1;
    pointer-events: auto;
  }

  &.clean {
    pointer-events: none;
    .rabish-icon {
      display: none;
    }
    .rabish-clean {
      display: block;
    }
  }
  .rabish-icon {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }
  .rabish-clean {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -70%);
    width: 3rem;
  }
}
.boardImg {
  position: absolute;
  left: 50%;
  top: 50%;
  bottom: 1.2rem;
  opacity: 0;
  width: 8rem;
  height: 2rem;
  z-index: 100;
  pointer-events: none;
  .hand {
    right: 0.2rem;
    top: 200%;
  }
  &.show {
    opacity: 1;
    pointer-events: auto;
    animation: ani-food-vertical 0.9s both;
  }
  .img0 {
    width: 8rem;
    height: auto;
  }
  .img1 {
    position: absolute;
    left: 10%;
    top: 40%;
    transform: translate(-10%, 30%);
    width: 2rem;
    height: auto;
    &.show {
      opacity: 0;
      animation: ani-food1-vertical 0.5s both;
    }
  }
  .plate1 {
    position: absolute;
    left: 9%;
    top: 32%;
    transform: translate(-10%, 30%);
    width: 2.2rem;
    height: auto;
  }
  .img2 {
    position: absolute;
    left: 11%;
    top: 200%;
    transform: translate(-10%, 10%);
    width: 1.8rem;
    height: auto;
    &.show {
      opacity: 0;
      animation: ani-food2-vertical 0.5s both;
    }
  }
  .plate2 {
    position: absolute;
    left: 9%;
    top: 200%;
    transform: translate(-9%, 20%);
    width: 2.2rem;
    height: auto;
  }
  .img3 {
    position: absolute;
    left: 38%;
    top: 110%;
    width: 1.8rem;
    height: auto;
    &.show {
      opacity: 0;
      animation: ani-food3-vertical 0.5s both;
    }
  }
  .plate3 {
    position: absolute;
    left: 35%;
    top: 130%;
    width: 2.2rem;
    height: auto;
  }
  .img4 {
    position: absolute;
    left: 67%;
    top: 60%;
    width: 1.8rem;
    height: auto;
    &.show {
      opacity: 0;
      animation: ani-food4-vertical 0.5s both;
    }
  }
  .plate4 {
    position: absolute;
    left: 65%;
    top: 50%;
    width: 2.2rem;
    height: auto;
  }
  .img5 {
    position: absolute;
    left: 68%;
    top: 210%;
    width: 1.8rem;
    height: auto;
    &.show {
      opacity: 0;
      animation: ani-food5-vertical 0.5s both;
    }
  }
  .plate5 {
    position: absolute;
    left: 65%;
    top: 200%;
    width: 2.2rem;
    height: auto;
  }
}

.hand {
  position: absolute;
  z-index: 999;
  width: 1.5rem;
  opacity: 0;
  pointer-events: none;
  &.show {
    opacity: 1;
  }
  &.play {
    bottom: 0.2rem;
    left: 50%;
  }
  &.food {
    bottom: 2rem;
    right: 0.5rem;
  }
}
</style>