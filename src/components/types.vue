<template>
  <div :class="['type-box', { right: baoStatus !== 'normal' }]">
    <div class="heart-box">
      <img class="heart" src="@/assets/imgs/icon-heart2.png" />
      <div class="line-box">
        <div
          class="line"
          :style="{ width: `${(heartNum / heartMax) * 100}%` }"
        />
        <div class="words">{{ heartNum }}/{{ heartMax }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, watch, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
defineProps({
  baoStatus: String,
});
const heartMax = 30;
const heartNum = ref(0);

onMounted(() => {
  const hearts = Number(localStorage.getItem("hearts")) || 0;
  const heartsTime = Number(localStorage.getItem("heartsTime")) || 0;

  const hours = Math.floor(((Date.now() - heartsTime) / 1000) * 60 * 60); // 过去了多少个小时
  heartNum.value = Math.max(hearts - hours, 0);

  store.dispatch("app/addLoves", heartNum.value);
});

const loves = computed(() => store.state.app.loves);

watch(
  () => loves.value,
  () => {
    setHeartNum(loves.value);
  }
);

function setHeartNum(num) {
  heartNum.value = Math.max(Math.min(num, heartMax), 0);
}

defineExpose({
  heartNum,
  setHeartNum,
});
</script>

<style lang="less">
.type-box {
  position: absolute;
  top: 1rem;
  left: 0.2rem;
  z-index: 99;
  display: flex;
  align-items: center;
  pointer-events: none;
  &.right {
    left: auto;
    right: 0.2rem;
  }

  .title {
    width: 0.7rem;
    height: auto;
  }

  .heart-box {
    display: flex;
    align-items: center;
    .heart {
      position: relative;
      z-index: 2;
      width: 0.7rem;
    }
    .line-box {
      position: relative;
      height: 0.38rem;
      width: 2.8rem;
      background: #fff;
      border-radius: 0 0.3rem 0.3rem 0;
      border: solid 1px #66443d;
      margin-left: -0.2rem;
      overflow: hidden;

      color: #fff;
      .words {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%) scale(0.9, 0.9);
        left: 50%;
        font-size: 0.28rem;
        font-family: PingFang SC, sans-serif;
        font-weight: 400;
        color: #ffffff;
        text-shadow: #65433d 1px 0 0, #65433d 0 1px 0, #65433d -1px 0 0,
          #65433d 0 -1px 0;
      }

      .line {
        padding-left: 0.1rem;
        width: 10%;
        height: 0.32rem;
        box-sizing: border-box;
        background: #ff725f;
        font-family: Kingnam Bobo, sans-serif;
        box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.25),
          0px 1px 2px 0px rgba(255, 255, 255, 0.25);
        border-radius: 0 0.3rem 0.3rem 0;
        margin-top: 0.015rem;
      }
    }
  }
}
</style>