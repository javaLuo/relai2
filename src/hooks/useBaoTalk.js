import { ref, onMounted, onUnmounted } from "vue";
import tools from "@/utils/tools.js";

const insideTalks = {
  sleep: 'Zzzzzzz...',
  hi: "Hi, 我是包晴天",
  what: '发生什么事了，能与我分享吗？',
  nie: "救命~别捏了！！要坏了~",
  play: "点击玩具球，和我一起玩儿吧！"
};
export default function useBaoTalk() {
  const clickTimes = ref(0); // 第几次点击bao
  const timer = ref(0);
  const talk = ref("");

  onMounted(() => {
    talk.value = insideTalks.sleep;
  });

  onUnmounted(() => {
    clearTimeout(timer.value);
  });

  function setTalk(type, msg) {

    if(type === 'hi'){
      if(clickTimes.value === 0){
        clickTimes.value += 1;
        talk.value = insideTalks.hi;
        clearTimeout(timer.value);
        timer.value = setTimeout(()=>{
          talk.value = insideTalks.what;
        }, 3000);
      }
      return;
    }

    clearTimeout(timer.value);
    if(msg) {
      talk.value = msg
    } else {
      talk.value = insideTalks[type];
    }

    timer.value = setTimeout(()=>{
      talk.value = "";
    }, 3000);
  }

  return {
    talk,
    setTalk,
  };
}
