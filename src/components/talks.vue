<template>
    <ul class="root-talks">
        <li v-for="(item, index) in mock" :key="index">
            {{ item.name }}:{{ item.text }}
        </li>
    </ul>
</template>

<script setup>
    const mock = [
        {id: 1, text: '能陪能陪陪我吗？能陪陪我吗？能陪陪我吗？陪我吗？', name: '我'},
        {id: 1, text: '能陪能陪陪我吗？能陪陪我吗？能陪陪我吗？陪我吗？', name: '我'},
        {id: 1, text: '能陪能陪陪我吗？能陪陪我吗？能陪陪我吗？陪我吗？', name: '我'}
    ]
</script>

<style lang="less" scoped>
    .root-talks{
        margin: 0;
        padding: 0;
        position: absolute;
        left: .58rem;
        bottom: 1.7rem;
        list-style: none;
        overflow: auto;
        max-height: 5rem;
        z-index: 100;
        &>li{
            box-sizing: border-box;
            padding: .2rem;
            max-width: 4rem;
            background: rgba(0,0,0,.1);
            border-radius: .1rem;
            font-size: .27rem;
            font-family: Source Han Sans CN, sans-serif;
            font-weight: 400;
            color: #FFFFFF;
            &+li{
                margin-top: .1rem;
            }

        }
    }
</style>