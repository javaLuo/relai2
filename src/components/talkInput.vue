<template>
  <label :class="['btn-label', {show}]" for="text-area" @click.stop>
    <img class="btn" src="@/assets/imgs/icon-key.png" />
  </label>
  <div :class="['root-talkinput', { show: isFocus && show }]" @click="onTxtBlur">
    <div :class="['input-box']" @click.stop>
      <div class="txt-box">
        <pre>{{ txt }}</pre>
        <textarea
          id="text-area"
          ref="txtArea"
          :value="txt"
          :maxlength="140"
          @input="onInput"
          @focus="onTxtFocus"
        />
      </div>
      <div class="submit" @click.stop="onSend" v-loading="isLoading">发送</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

const props = defineProps({
  show: Boolean,
});

const store = useStore();

const txtArea = ref(null);
const txt = ref("");
const isFocus = ref(false);
const isLoading = ref(false);

function onInput(e) {
  console.log(e);
  txt.value = e.target.value;
}

function onTxtFocus() {
  isFocus.value = true;
}

function onTxtBlur() {
  isFocus.value = false;
}

async function onSend() {
  const txtTemp = txt.value.trim();
  if (!txtTemp) {
    ElMessage("请输入有效信息");
    return;
  }

  if (isLoading.value) return;
  isLoading.value = true;
  const res = await store.dispatch("app/sendMsg", { txt: txt.value });
  if (res) {
    onTxtBlur();
    txt.value = "";
  } else {
    ElMessage.error("发送失败，请稍后重试");
  }
  isLoading.value = false;
}
</script>

<style lang="less" scoped>
.btn-label {
  position: absolute;
  left: 0.57rem;
  bottom: 0.7rem;
  width: 0.7rem;
  height: 0.7rem;
  z-index: 99;
  opacity: 0;
  pointer-events: none;
  &.show{
    opacity: 1;
    pointer-events: auto;
  }
  .btn {
    width: 100%;
    height: 100%;
  }
}

.root-talkinput {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  //   background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;
  z-index: 200;
  &.show {
    opacity: 1;
    pointer-events: auto;
  }

  .input-box {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 200;
    width: 100%;
    box-sizing: border-box;
    padding: 0.2rem;
    background: #ffffff;
    border-radius: 0.26rem 0.26rem 0px 0px;

    display: flex;
    align-items: flex-end;
    gap: 0.2rem;

    .txt-box {
      position: relative;
      flex: none;
      background: #efefef;
      box-sizing: border-box;
      border-radius: 0.2rem;
      width: 5.87rem;
      height: auto;
      font-size: 0.28rem;
      pre {
        opacity: 0;
        display: block;
        width: 5.87rem;
        pointer-events: none;
        font-family: Microsoft YaHei, sans-serif;
        font-weight: 400;
        color: #333333;
        font-size: 0.28rem;
        line-height: 0.32rem;
        padding: 0.1rem 0.2rem;
        min-height: 0.8rem;
        max-height: 2.4rem;
        overflow: auto;
        background-color: #ccc;
        box-sizing: border-box;
        word-wrap: break-word;
        word-break: break-all;
        line-break: anywhere;
        white-space: pre-wrap;
      }
      textarea {
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
        padding: 0.1rem 0.2rem;
        box-sizing: border-box;
        border: none;
        outline: none;
        background-color: transparent;
        resize: none;
        overflow: auto;
        word-wrap: break-word;
        word-break: break-all;
        line-break: anywhere;
        white-space: pre-wrap;
      }
    }
    .submit {
      flex: none;
      width: 1.04rem;
      height: 0.6rem;
      background: #ffbc3b;
      border-radius: 0.2rem;
      font-size: 0.27rem;
      font-family: Source Han Sans CN, sans-serif;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      line-height: 0.6rem;
    }
  }
}
</style>