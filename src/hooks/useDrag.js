import {ref, onMounted, watch} from 'vue';
import anime from 'animejs';

export default function useDrag(dom){
    const d = ref(null);
    const touchStartInfo = ref({x: 0, y: 0});
    const touchPrevInfo =  ref({x: 0, y: 0});
    const transPrev = ref({x: 0, y: 0});

    watch(()=> dom.value, (newV)=>{
        d.value = newV;
    });

    onMounted(()=>{
        console.log('onMounted');
    });

    function onTouchStart(e){
        // console.log('onTouchStart', e);
        touchStartInfo.value = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        }
    }

    function onTouchMove(e){
        // console.log('onTouchMove', d.value.style.translate);
        const touchNow = e.touches[0];
        const diffX = transPrev.value.x + touchNow.clientX - touchStartInfo.value.x;
        const diffY = transPrev.value.y + touchNow.clientY - touchStartInfo.value.y;
        touchPrevInfo.value.x = diffX;
        touchPrevInfo.value.y = diffY;

        d.value.style.translate = `${diffX}px ${diffY}px`;
    }

    function onTouchEnd(){
        transPrev.value = {
            x: touchPrevInfo.value.x,
            y: touchPrevInfo.value.y
        }

        const battery = {
            x: touchPrevInfo.value.x,
            y: touchPrevInfo.value.y
        }

        touchPrevInfo.value = {x: 0, y: 0};
        transPrev.value = {x: 0, y: 0};
        anime({
            targets: battery,
            x: 0,
            y: 0,
            round: 1,
            easing: 'linear',
            duration: 300,
            update: function() {
            //   logEl.innerHTML = JSON.stringify(battery);
              d.value.style.translate = `${battery.x}px ${battery.y}px`;
            },
          });
    }

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd
    }
}