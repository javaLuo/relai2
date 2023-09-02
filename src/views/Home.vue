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
  import {ref} from 'vue';
  import {useRouter} from 'vue-router';
  import Bao from "@/components/bao.vue";
  import Talks from "@/components/talks.vue";
  import TalkInput from "@/components/talkInput.vue";

  const router = useRouter();


</script>

<style lang="less" scoped>
.root {
  position: relative;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: .2rem;
  background-color: #f7f7f7;
  background-image: linear-gradient(to bottom, #FFF1D0 50%, #DD9E7D 50%);
  overflow: hidden;

  .type-box{
    position: absolute;
    top: 1rem;
    left: .2rem;
    z-index: 99;
    display: flex;
    align-items: center;
    .title{
      font-size: .23rem;
      font-family: Source Han Sans CN, sans-serif;
      font-weight: 400;
      color: #FFFFFF;
      text-shadow: #BD673B 1px 0 0, #BD673B 0 1px 0, #BD673B -1px 0 0, #BD673B 0 -1px 0;
      // -webkit-text-stroke: 1px #BD673B;
      // text-stroke: 1px #BD673B;
      margin-right: .1rem;
    }

    .heart-box{
      display: flex;
      align-items: center;
      .heart{
        position: relative;
        z-index: 2;
        width: .44rem;
        height: .44rem;
        background: #FFF3E5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 1px #DD9E7D;
        img{
          width: .32rem;
        }
      }
      .line-box{
        position: relative;
        height: .33rem;
        width: 2.5rem;
        background: #FFF3E5;
        border-radius: .3rem;
        border: solid 1px #FFBC3B;
        margin-left: -.2rem;
        overflow: hidden;
       
        // -webkit-text-stroke: 1px #47332F;
        // text-stroke: 1px #47332F;
        color: #fff;
        .words{
          position: absolute;
          top: 50%;
          transform: translateY(-50%) scale(.9, .9);
          left: .2rem;
          font-size: .2rem;
          font-family: PingFang SC, sans-serif;
          font-weight: 400;
          color: #FFFFFF;
          text-shadow: #47332F 1px 0 0, #47332F 0 1px 0, #47332F -1px 0 0, #47332F 0 -1px 0;
        }

        .line{
          background-color: #FFBC3B;
          padding-left: .1rem;
          width: 10%;
          height: 100%;
          box-sizing: border-box;
        }
      }
    }
  }

  .control{
    position: absolute;
    top: 1rem;
    right: .2rem;
    z-index: 99;
    display: flex;
    flex-direction: column;
    gap: .18rem;
    .item{
      position: relative;
      width: 1.12rem;
      height: 1.12rem;
      img{
        width: 100%;
        height: 100%;
      }
      &>div{
        width: .96rem;
        height: .38rem;
        background: #FFFFFF;
        border-radius: .38rem;
        font-size: .23rem;
        font-family: Source Han Sans CN, sans-serif;
        font-weight: 400;
        color: #7B6A67;
        text-align: center;
        line-height: .38rem;
        position: absolute;
        bottom: -.1rem;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

}
</style>