<template>
  <div :class="['root-talks-box', { show }]">
    <ul class="root-talks" ref="scrollBox">
      <li
        v-for="(item, index) in talkList"
        :key="index"
        :class="{ user: Object.keys(item)[0] === 'user' }"
      >
        {{ Object.values(item)[0] }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";

defineProps({
  show: Boolean,
});
const store = useStore();
const scrollBox = ref(null);

const talkList = computed(() => {
  let t = store.state.app.talks;
  // if (t.length) {
  //   t = t.filter((talk) => Object.keys(talk)[0] === "user");
  //   console.log("t:", t);
  // }
  //   t.reverse();
  return t;
});

watch(
  () => talkList.value,
  () => {
    setTimeout(() => {
      const scrollHeight = scrollBox.value.scrollHeight; // 内容总高度
      scrollBox.value.scrollTo(0, scrollHeight);
    }, 32);
  }
);
</script>

<style lang="less" scoped>
.root-talks-box {
  position: absolute;
  left: 0.58rem;
  bottom: 1.4rem;
  max-height: 4rem;
  overflow: hidden;
  width: 6.34rem;
  opacity: 0;
  pointer-events: none;
  &.show {
    opacity: 1;
    pointer-events: auto;
  }
}
.root-talks {
  width: calc(6.34rem + 20px);
  padding: 0;
  position: relative;
  margin: 0;
  list-style: none;
  overflow-x: clip;
  overflow-y: auto;
  max-height: 4rem;
  z-index: 100;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  align-items: flex-start;
  & > li {
    box-sizing: border-box;
    padding: 0.2rem;
    max-width: 4.2rem;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0.1rem;
    font-size: 0.25rem;
    font-family: Source Han Sans CN, sans-serif;
    font-weight: 400;
    color: #ffffff;
    line-break: anywhere;
    &.user {
      align-self: flex-end;
      margin-right: 21px;
    }
  }
}
</style>