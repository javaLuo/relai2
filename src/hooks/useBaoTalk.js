import { ref, onMounted, onUnmounted } from "vue";
import tools from "@/utils/tools.js";

const defaultTalk = ["怎么了？我一直在这陪着你", "Hi, 我是包晴天", "发生什么事了，能与我分享吗？"];
const insideTalks = {
  nie: "救命~别捏了！！要坏了~",
};
export default function useBaoTalk() {
  const timer = ref(0);
  const talk = ref("");

  onMounted(() => {
    const index = tools.getRandomInt(0, defaultTalk.length - 1);
    talk.value = defaultTalk[index];
    onDefaultTalk();
  });

  onUnmounted(() => {
    clearTimeout(timer.value);
  });

  function onDefaultTalk() {
    clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      if (talk.value) {
        talk.value = "";
      } else {
        const index = tools.getRandomInt(0, defaultTalk.length - 1);
        talk.value = defaultTalk[index];
      }

      onDefaultTalk();
    }, 3000);
  }

  function setTalk(type) {
    clearTimeout(timer.value);
    talk.value = insideTalks[type];
    onDefaultTalk();
  }

  return {
    talk,
    setTalk,
  };
}
