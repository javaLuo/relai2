<template>
  <div :class="['root', { noBack: baoStatus === 'play' }]">
    <!-- 左上角状态 -->
    <Types ref="typesBaoRes" :baoStatus="baoStatus" />

    <!-- 右边按钮 -->
    <div :class="['control', { show: baoStatus === 'normal' }]">
      <div class="item" @click="onFood">
        <img src="@/assets/imgs/icon-touwei.png" />
        <div>投喂{{ baoStatus }}</div>
      </div>

      <div class="item" @click="onPlay">
        <img src="@/assets/imgs/icon-play.png" />
        <div>玩耍</div>
      </div>

      <div class="item">
        <img src="@/assets/imgs/icon-zhuang.png" />
        <div>装饰</div>
      </div>
    </div>

    <Bao
      :status="baoStatus"
      :food="foodStatus"
      @onPlayClose="onPlayClose"
      @onFoodClose="onFoodClose"
    />

    <!-- 底部区域 -->
    <Talks :show="baoStatus === 'normal'" />
    <TalkInput :show="baoStatus === 'normal'" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Bao from "@/components/bao.vue";
import Talks from "@/components/talks.vue";
import TalkInput from "@/components/talkInput.vue";
import Types from "@/components/types.vue";

const baoStatus = ref("normal");
const typesBaoRes = ref(null);
const foodStatus = ref(null);

// 进入玩耍状态
function onPlay() {
  baoStatus.value = "play";
}

// 结束玩耍
function onPlayClose() {
  baoStatus.value = "normal";
}

//投喂
function onFood() {
  baoStatus.value = "food";
  foodStatus.value = true;
}

function onFoodClose() {
  baoStatus.value = "normal";
  foodStatus.value = false;
}
</script>

<style lang="less" scoped>
.root {
  position: fixed;
  width: 100%;
  max-width: 7.5rem;
  height: 100vh;
  box-sizing: border-box;
  padding: 0.2rem;
  background-color: #f7f7f7;

  background-image: url("@/assets/imgs/back.webp");
  background-size: cover;
  background-position: center;
  overflow: hidden;
  &.noBack {
    background-image: linear-gradient(
      to bottom,
      #fff1d0 0%,
      #fff9e9 50%,
      #d8b8a3 50%,
      #e2cbbb 100%
    );
  }

  .control {
    position: absolute;
    top: 1rem;
    right: 0.2rem;
    z-index: 99;
    display: flex;
    flex-direction: column;
    opacity: 0;
    pointer-events: none;
    gap: 0.22rem;
    &.show {
      opacity: 1;
      pointer-events: auto;
    }
    .item {
      position: relative;
      width: 1.12rem;
      height: 1.12rem;

      img {
        width: 100%;
        height: 100%;
      }
      & > div {
        width: 0.96rem;
        height: 0.38rem;
        background: #ffffff;
        border-radius: 0.38rem;
        font-size: 0.23rem;
        font-family: Source Han Sans CN, sans-serif;
        font-weight: 400;
        color: #7b6a67;
        text-align: center;
        line-height: 0.38rem;
        position: absolute;
        bottom: -0.1rem;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>