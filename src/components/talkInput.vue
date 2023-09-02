<template>
    <div class="root-talkinput">
        <img class="btn" src="@/assets/imgs/icon-key.png" />
        <div class="input-box">
            <div class="txt-box">
                <pre>{{ txt }}</pre>
                <textarea :value="txt" @input="onInput" :maxlength="140"/>
            </div>
            <div class="submit">发送</div>
        </div>
    </div>
</template>

<script setup>
    import {ref} from 'vue';

    const txt = ref("");

    function onInput(e){
        console.log(e);
        txt.value = e.target.value;
    }
</script>

<style lang="less" scoped>
    .root-talkinput{
        position: absolute;
        left: .57rem;
        bottom: .7rem;
        z-index: 200;
        .btn{
            width: .7rem;
            height: .7rem;
        }
        .input-box{
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 200;
            width: 100%;
            box-sizing: border-box;
            padding: .2rem;
            background: #FFFFFF;
            border-radius: .26rem .26rem 0px 0px;
            display: flex;
            align-items: flex-end;
            gap: .2rem;
            .txt-box{
                position: relative;
                flex: none;
                background: #EFEFEF;
                box-sizing: border-box;
                border-radius: .2rem;
                width: 5.87rem;
                height: auto;
                font-size: 0.28rem;
                pre{
                    // opacity: 0;
                    display: block;
                    width: 5.87rem;
                    pointer-events: none;
                    font-family: Microsoft YaHei, sans-serif;
                    font-weight: 400;
                    color: #333333;
                    font-size: 0.28rem;
                    line-height: 0.32rem;
                    padding: 0 0.2rem;
                    min-height: .8rem;
                    max-height: 2.4rem;
                    overflow: auto;
                    background-color: #ccc;
                    box-sizing: border-box;
                    word-wrap: break-word;
                    word-break: break-all;
                    line-break: anywhere;
                    white-space: pre-wrap;

                }
                textarea{
                    // opacity: 0;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 5.87rem;
                    height: 100%;
                    display: block;
                    font-size: 0.28rem;
                    font-family: Microsoft YaHei, sans-serif;
                    font-weight: 400;
                    color: #333333;
                    line-height: 0.32rem;
                    padding: 0 0.2rem;
                    border: none;
                    outline: none;
                    background-color: transparent;
                    resize: none;
                    overflow: hidden;
                    word-wrap: break-word;
                    word-break: break-all;
                    line-break: anywhere;
                    white-space: pre-wrap;
                }
            }
            .submit{
                flex: none;
                width: 1.04rem;
                height: .6rem;
                background: #FFBC3B;
                border-radius: .2rem;
                font-size: .27rem;
                font-family: Source Han Sans CN, sans-serif;
                font-weight: 400;
                color: #FFFFFF;
                text-align: center;
                line-height: .6rem;
                
            }
        }
    }
</style>