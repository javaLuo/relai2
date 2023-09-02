<template>
    <div class="root-bao">
        <div class="talk">
            怎么了？我一直在这陪着你
        </div>
        <img 
            ref="bao" 
            class="bao" 
            :src="emoji" 
            @touchstart="onTouchStart" 
            @touchmove="baoDrag.onTouchMove"
            @touchcancel="baoDrag.onTouchEnd"
            @touchend="baoDrag.onTouchEnd"
        />

        <div class="prev">
            <img  src="@/assets/imgs/bao/boring.gif" />
            <img src="@/assets/imgs/bao/greet.gif" />
            <img src="@/assets/imgs/bao/sad.gif" />
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import useBaoEmoji from '@/hooks/useBaoEmoji';
    import useDrag from '@/hooks/useDrag';

   const bao = ref(null);
   const {emoji, setEmoji} = useBaoEmoji();

   // 开始抓取bao
   const baoDrag = useDrag(bao);

   function onTouchStart(e){
    setEmoji('greet');
        baoDrag.onTouchStart(e);
    }

</script>

<style lang="less" setup>
    .root-bao{
        position: absolute;
        top: 46%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
        .prev{
            width :1px;
            height: 1px;
            pointer-events: none;
            overflow: hidden;
            opacity: 0;
            z-index: -1;
        }
        .talk{
            position: absolute;
            left: 50%;
            
            transform: translateX(-50%) translateY(-.1rem);
            width: 4rem;
            max-height: 3rem;
            border: 3px solid #FFFFFF;
            background-color: rgba(255,255,255,.6);
            border-radius: .15rem;
            font-size: .28rem;
            font-family: Source Han Sans CN, sans-serif;
            font-weight: 400;
            color: #333333;
            line-height: .58rem;
            text-align: center;
            word-break: break-all;
            line-break: anywhere;
        }
        .bao{
            position: relative;
            width: 4.85rem;
            height: auto;
        }
    }
</style>