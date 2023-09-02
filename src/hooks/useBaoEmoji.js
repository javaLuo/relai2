import { ref, computed } from "vue";
import ImgSleep from "@/assets/imgs/bao/sleep.gif";
import ImgGreet from "@/assets/imgs/bao/greet.gif";
import ImgSad from "@/assets/imgs/bao/sad.gif";
import ImgNie from "@/assets/imgs/bao/nie.gif";
import ImgHappy from "@/assets/imgs/bao/happy.gif";

export default function useBaoEmoji() {
  const emojis = {
    greet: ImgGreet,
    sad: ImgSad,
    sleep: ImgSleep,
    nie: ImgNie,
    happy: ImgHappy,
  };

  const type = ref("sleep");
  const emoji = computed(() => {
    return emojis[type.value];
  });

  function setEmoji(t) {
    type.value = t;
  }

  return {
    emoji,
    setEmoji,
  };
}
