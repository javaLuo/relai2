import {ref, onMounted} from 'vue';
import Img1 from '@/assets/imgs/clean/icon-1.png';
import Img2 from '@/assets/imgs/clean/icon-2.png';
import Img3 from '@/assets/imgs/clean/icon-3.png';
import tools from '@/utils/tools.js';

const imgs = [
    Img1,Img2,Img3
]
export default function useClean(){

    const cleanInfo = ref({
        time: Date.now(),
        todayNum: 0,
        maxNum: 10,
        objNum: 0, // 当前数量
    });

    const objsArr = ref([]);
    console.log('objsArr0', objsArr);

    onMounted(()=>{
        let res = localStorage.getItem("cleanInfo");
        console.log('waht :', res);
        if(res){
            try{
                res = JSON.parse(res);
            }catch{
                res = {time: Date.now(), objNum: 3, todayNum: 0, maxNum: 10};
            }
        } else {
            res = {time: Date.now(), objNum: 3, todayNum: 0, maxNum: 10};
        }
        cleanInfo.value = res;

        initObjsArr();
    });

   function initObjsArr(){
   
    const clientHeight = document.documentElement.clientHeight;

        for(let i=0;i<cleanInfo.value.objNum;i++){
            const index = tools.getRandomInt(0, imgs.length - 1);
            objsArr.value.push({
                src: imgs[index],
                x: Math.random() * 6.5 + 0.5, // rem
                y: Math.random() * (clientHeight / 2) + (clientHeight / 2 - 50), // px
                w: index === 0 ? 1.5 : (index === 1) ? 2 : 1.2,
            })
        }

        console.log('initObjsArr??', objsArr.value);
    }

    return {
        cleanInfo,
        objsArr
    }
}