import { ref, onMounted, onUnmounted } from "vue";
import tools from "@/utils/tools.js";

const defaultTalk = ["怎么了？我一直在这陪着你", "Hi, 我是包晴天", "发生什么事了，能与我分享吗？"];
const insideTalks = {
  nie: "救命~别捏了！！要坏了~",
  play: "点击玩具球，和我一起玩儿吧！"
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

  function setTalk(type, isNoKeep) {
    clearTimeout(timer.value);
    talk.value = insideTalks[type];
    if(!isNoKeep){
      onDefaultTalk();
    } else {
      timer.value = setTimeout(()=>{
        talk.value = "";
      }, 3000);
    }
  }

  return {
    talk,
    setTalk,
    onDefaultTalk
  };
}
