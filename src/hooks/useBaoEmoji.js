import { ref, computed } from "vue";
import ImgSleep from "@/assets/imgs/bao/sleep.gif";
import ImgGreet from "@/assets/imgs/bao/greet.gif";
import ImgSad from "@/assets/imgs/bao/sad.gif";
import ImgNie from "@/assets/imgs/bao/nie.gif";
import ImgHappy from "@/assets/imgs/bao/happy.gif";
import ImgFood from "@/assets/imgs/bao/food.gif";
import ImgEat from "@/assets/imgs/bao/eat.gif";
import ImgBall1 from "@/assets/imgs/bao/ball1.gif";
import ImgBall2 from "@/assets/imgs/bao/ball2.gif";

export default function useBaoEmoji() {
  const emojis = {
    greet: ImgGreet,
    sad: ImgSad,
    sleep: ImgSleep,
    nie: ImgNie,
    happy: ImgHappy,
    food: ImgFood,
    eat: ImgEat,
    ball1: ImgBall1,
    ball2: ImgBall2
  };

  const type = ref("sleep");
  const emoji = computed(() => {
    return { type: type.value, src: emojis[type.value] };
  });

  function setEmoji(t) {
    type.value = t;
  }

  return {
    emoji,
    setEmoji,
  };
}
