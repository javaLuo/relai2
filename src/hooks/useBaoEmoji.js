import {ref, computed} from 'vue';
import ImgBoring from '@/assets/imgs/bao/boring.gif';
import ImgGreet from '@/assets/imgs/bao/greet.gif';
import ImgSad from '@/assets/imgs/bao/sad.gif';

export default function useBaoEmoji(){

    const emojis = {
        greet: ImgGreet,
        sad: ImgSad,
        boring: ImgBoring,
    };

    const type = ref('boring');
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