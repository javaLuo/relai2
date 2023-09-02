import {ref, computed} from 'vue';
import ImgSleep from '@/assets/imgs/bao/sleep.gif';
import ImgGreet from '@/assets/imgs/bao/greet.gif';
import ImgSad from '@/assets/imgs/bao/sad.gif';

export default function useBaoEmoji(){

    const emojis = {
        greet: ImgGreet,
        sad: ImgSad,
        sleep: ImgSleep,
    };

    const type = ref('sleep');
    const emoji = computed(()=>{
        return emojis[type.value];
    });

    function setEmoji(t){
        type.value = t;
    }

    return {
        emoji,
        setEmoji
    }
}