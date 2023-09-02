<template>
    <div class="root-bao">
        <div class="talk">
            怎么了？我一直在这陪着你
        </div>
        <img class="bao" src="@/assets/imgs/bao/boring.gif" />
        </div>
</template>
<script setup>
</script>

<style lang="less" setup>
    .root-bao{
        position: absolute;
        top: 46%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
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
            user-select: none;
            pointer-events: none;
        }
    }
</style>