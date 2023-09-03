<template>
  <div :class="['root-talks-box', {show}]">
    <ul class="root-talks" ref="scrollBox">
      <li v-for="(item, index) in talkList" :key="index">
        {{ item.name }}:{{ item.txt }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  show: Boolean,
});
const store = useStore();
const scrollBox = ref(null);

const talkList = computed(() => {
  const t = store.state.app.talks;
  //   t.reverse();
  return t;
});

watch(
  () => talkList.value,
  () => {
    const currentScroll = scrollBox.value.scrollTop; // 已经被卷掉的高度
    const clientHeight = scrollBox.value.offsetHeight; // 容器高度
    const scrollHeight = scrollBox.value.scrollHeight; // 内容总高度
    console.log("scroll:", currentScroll, clientHeight, scrollHeight);
    scrollBox.value.scrollTo(0, scrollHeight);
  }
);
</script>

<style lang="less" scoped>
.root-talks-box {
  position: absolute;
  left: 0.58rem;
  bottom: 1.7rem;
  max-height: 4.6rem;
  overflow: hidden;
  width: 4rem;
  opacity: 0;
  pointer-events: none;
  &.show{
    opacity: 1;
    pointer-events: auto;
  }
}
.root-talks {
  width: calc(4rem + 20px);
  padding: 0;
  position: relative;
  margin: 0;
  list-style: none;
  overflow-x: clip;
  overflow-y: auto;
  max-height: 4.6rem;
  z-index: 100;
  //   background: #f00;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  align-items: flex-start;
  & > li {
    box-sizing: border-box;
    padding: 0.2rem;
    max-width: 4rem;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0.1rem;
    font-size: 0.27rem;
    font-family: Source Han Sans CN, sans-serif;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>