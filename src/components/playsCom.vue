<template>
    <div :class="['root-ball', {show}]">

        <img :class="['close', {show: !isLoading}]" src="@/assets/imgs/icon-close.png" @click="onClose"/>

        <!-- 球门 -->
        <img class="door" src="@/assets/imgs/play/door.png" />

        <!-- 球 -->
        <img ref="ballRef" class="ball" src="@/assets/imgs/play/ball.png" @click="onBallSend" />
    </div>
</template>

<script setup>
import {ref} from 'vue';
import tools from '@/utils/tools.js';
import anime from 'animejs';

const emits = defineEmits(['close', 'baoAction']);
const props = defineProps({
    show: Boolean,
});
const ballRef = ref(null);
const isLoading = ref(false);

function onBallSend(){
    isLoading.value = true;
    const ref = tools.getRandomInt(0,1);

    // 得到左边目标点
    const clientHeight = document.documentElement.clientHeight;
    const ballRect = ballRef.value.getBoundingClientRect();
    const targetBall = {
        y: clientHeight/2 - ballRect.top
    }
    
    emits('baoAction', tools.getRandomInt(0,1));

    // 球轨迹
    const ballObj = {
        x: 0,
        y: 0,
        scale: 1,
    }

    let x = 0;
    if(ref === 0){
        // 左
        x = -2;
    } else {
        // 右
        x = 2;
    }

    anime({
        targets: ballObj,
        x,
        y: targetBall.y,
        scale: 0.4,
        easing: "linear",
        duration: 600,
        update: function () {
            ballRef.value.style.transform = `translate(-50%, 0) scale(${ballObj.scale}, ${ballObj.scale})`;
            ballRef.value.style.translate = `${ballObj.x}rem calc(${ballObj.y}px - 2rem)`;
           
        },
        complete: function(anim) {
           console.log('动画结束');
           setTimeout(()=>{
            ballRef.value.style.translate = "0rem 0px";
            ballRef.value.style.transform = 'translate(-50%, 0) scale(1, 1)';
            isLoading.value = false;
           }, 1500);
        }
    });
}

function onClose(){
    emits("close");
}
</script>

<style lang="less">
    .root-ball{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.2);
        z-index: 98;
        opacity: 0;
        pointer-events: none;
        &.show{
            opacity: 1;
            pointer-events: auto;
        }


    }
</style>