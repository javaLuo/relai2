<template>
  <div class="root">
    <!-- 左上角状态 -->
    <div class="type-box">
      <div class="title">心情值</div>
      <div class="heart-box">
        <div class="heart"><img src="@/assets/imgs/icon-heart.png" /></div>
        <div class="line-box">
          <div class="line" />
          <div class="words">10/30</div>
        </div>
      </div>
    </div>

    <!-- 右边按钮 -->
    <div class="control">
      <div class="item">
        <img src="@/assets/imgs/icon-touwei.png" />
        <div>投喂</div>
      </div>

      <div class="item">
        <img src="@/assets/imgs/icon-play.png" />
        <div>玩耍</div>
      </div>
    </div>

    <Bao />

    <!-- 底部区域 -->
    <Talks />
    <TalkInput />
  </div>
</template>

<script setup>
// import { useRouter } from "vue-router";
import Bao from "@/components/bao.vue";
import Talks from "@/components/talks.vue";
import TalkInput from "@/components/talkInput.vue";

// const router = useRouter();
</script>

<style lang="less" scoped>
.root {
  position: relative;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 0.2rem;
  background-color: #f7f7f7;
  background-image: linear-gradient(to bottom, #fff1d0 50%, #dd9e7d 50%);
  overflow: hidden;

  .type-box {
    position: absolute;
    top: 1rem;
    left: 0.2rem;
    z-index: 99;
    display: flex;
    align-items: center;
    .title {
      font-size: 0.23rem;
      font-family: Source Han Sans CN, sans-serif;
      font-weight: 400;
      color: #ffffff;
      text-shadow: #bd673b 1px 0 0, #bd673b 0 1px 0, #bd673b -1px 0 0,
        #bd673b 0 -1px 0;
      // -webkit-text-stroke: 1px #BD673B;
      // text-stroke: 1px #BD673B;
      margin-right: 0.1rem;
    }

    .heart-box {
      display: flex;
      align-items: center;
      .heart {
        position: relative;
        z-index: 2;
        width: 0.44rem;
        height: 0.44rem;
        background: #fff3e5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 1px #dd9e7d;
        img {
          width: 0.32rem;
        }
      }
      .line-box {
        position: relative;
        height: 0.33rem;
        width: 2.5rem;
        background: #fff3e5;
        border-radius: 0.3rem;
        border: solid 1px #ffbc3b;
        margin-left: -0.2rem;
        overflow: hidden;

        // -webkit-text-stroke: 1px #47332F;
        // text-stroke: 1px #47332F;
        color: #fff;
        .words {
          position: absolute;
          top: 50%;
          transform: translateY(-50%) scale(0.9, 0.9);
          left: 0.2rem;
          font-size: 0.2rem;
          font-family: PingFang SC, sans-serif;
          font-weight: 400;
          color: #ffffff;
          text-shadow: #47332f 1px 0 0, #47332f 0 1px 0, #47332f -1px 0 0,
            #47332f 0 -1px 0;
        }

        .line {
          background-color: #ffbc3b;
          padding-left: 0.1rem;
          width: 10%;
          height: 100%;
          box-sizing: border-box;
        }
      }
    }
  }

  .control {
    position: absolute;
    top: 1rem;
    right: 0.2rem;
    z-index: 99;
    display: flex;
    flex-direction: column;
    gap: 0.18rem;
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