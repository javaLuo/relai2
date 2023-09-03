<template>
    <div :class="['type-box', {show: show}]">
      <div class="title">心情值</div>
      <div class="heart-box">
        <div class="heart"><img src="@/assets/imgs/icon-heart.png" /></div>
        <div class="line-box">
          <div class="line" :style="{width: `${heartNum/heartMax * 100}%`}" />
          <div class="words">{{ heartNum }}/{{ heartMax }}</div>
        </div>
      </div>
    </div>
</template>

<script setup>
   import {onMounted, ref} from 'vue';

  defineProps({
    show: Boolean,
   });
   const heartMax = 30;
   const heartNum = ref(0);

   onMounted(()=>{
    const hearts = localStorage.getItem('hearts');
    heartNum.value = Number(hearts) || 0;
   });

   function setHeartNum(num){
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
    opacity: 0;
    &.show{
      opacity: 1;
    }
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
</style>